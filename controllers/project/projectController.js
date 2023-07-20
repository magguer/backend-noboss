const { default: slugify } = require("slugify");
const { Project, RoleProject, Heading, User, Application, Product, Category, Subcategory, Service } = require("../../models");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const matriz = (status) => {
  return {
    editProject: status,
    removeProject: status,
    addRoleProject: status,
    editRoleProject: status,
    removeRoleProject: status,
    editMemberProject: status,
    kickMemberProject: status,
    addCategory: status,
    editCategory: status,
    removeCategory: status,
    addProduct: status,
    editProduct: status,
    removeProduct: status,
    addClient: status,
    editClient: status,
    removeClient: status,
    addService: status,
    editService: status,
    removeService: status
  }
}


// Display a listing of projects.
async function index(req, res) {
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    const projects = await Project.find({ slug: { $regex: regex }, }).populate("heading").populate("movements").populate("applications")
    return res.json(projects);
  }
  if (req.query.public === "true") {
    const projects = await Project.find({ public: true }).populate("heading").populate("movements").populate("applications");
    return res.json(projects);
  } else {
    const projects = await Project.find().populate("heading").populate("movements").populate("applications");
    return res.json(projects);
  }

}

// Display the specified resource.
async function show(req, res) {
  const project = await Project.findById(req.params.id).populate("movements");
  res.json(project);
}

// Store a project.
async function store(req, res) {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
  });
  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Error parsing the files");
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }
      if (files.logo_url) {
        const ext = path.extname(files.logo_url.filepath);
        const newFileName = `image_${Date.now()}${ext}`;
        const user = await User.findById(req.auth.id)
        const heading = await Heading.findOne({ slug: fields.heading })

        const roleAdmin = new RoleProject({
          name: "Administrador",
          slug: "administrador",
          description: "Usuario administrador del Proyecto.",
          matriz: matriz(true),
          members: [req.auth.id]
        })

        const roleMember = new RoleProject({
          name: "Miembro",
          slug: "miembro",
          description: "Usuario miembro del Proyecto.",
          matriz: matriz(false),
          members: []
        })

        const project = new Project({
          name: fields.name,
          members: [{ role: roleAdmin, member: req.auth.id }],
          heading: heading._id,
          color_one: fields.color_one || "#02997d",
          color_two: fields.color_two || "#c9c9c9",
          roles: [roleAdmin, roleMember],
          slug: slugify(fields.name).toLowerCase(),
          logo_url: newFileName,
          public: false,
          provider: false,
          products_on: fields.products,
          services_on: fields.services,
          invested_money: 0,
          sales_money: 0,
          spent_money: 0,
          banned: false
        });

        await project.save();

        // Upload Logo in Supabase 
        await supabase.storage
          .from(`imgs/projects/${project._id}/logo`)
          .upload(newFileName, fs.createReadStream(files.logo_url.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.logo_url.mimetype,
            duplex: "half",
          });

        user.projects.push(project._id)
        heading.projects.push(project._id)
        roleAdmin.project = project._id
        roleMember.project = project._id
        await user.save()
        await roleAdmin.save()
        await roleMember.save()
        await heading.save()

        const newProject = await Project.findById(project.id).populate(["heading", "roles", "sub_categories", "categories", "movements", { path: "members", populate: ["role", "member"] }])
        return res.json(
          newProject
        );
      }
    });
  } catch (error) {
    res.json(error);
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const heading = await Heading.findById(req.body.heading)
  const project = await Project.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    services_on: req.body.services,
    products_on: req.body.products,
    public: req.body.public_project,
    provider: req.body.provider_project,
    color_one: req.body.color_one,
    color_two: req.body.color_two,
    heading: heading._id
  }, { returnOriginal: false }).populate(["heading", "roles", "sub_categories", "categories", "movements", { path: "members", populate: ["role", "member"] }])

  await Heading.findByIdAndUpdate(req.body.originalHeading, { $pull: { projects: project._id } })
  heading.projects.push(project)
  heading.save()

  return res.json(
    project
  );
}

// Remove the specified resource from storage.
async function destroy(req, res) {

  const products = await Product.find({ project: req.params.id })
  const services = await Service.find({ project: req.params.id })
  const project = await Project.findById(req.params.id)

  await Product.deleteMany({ project: req.params.id });
  await Service.deleteMany({ project: req.params.id });
  await Subcategory.deleteMany({ project: req.params.id });
  await Category.deleteMany({ project: req.params.id });
  await Project.findByIdAndDelete(req.params.id);

  if (products) {
    for (let product of products) {
      for (let image of product.images_url) {
        console.log(image);
        await supabase.storage
          .from("imgs")
          .remove(`projects/${req.params.id}/products/${image}`)
      }
    }
  }

  if (services) {
    for (let service of services) {
      for (let image of service.images_url) {
        await supabase.storage
          .from("imgs")
          .remove(`projects/${req.params.id}/services/${image}`)
      }
    }
  }

  await supabase.storage
    .from("imgs")
    .remove(`projects/${req.params.id}/logo/${project.logo_url}`)

  await supabase.storage
    .from("imgs")
    .remove(`projects/${req.params.id}/banner/${project.banner_url}`)

  await supabase.storage
    .from("imgs")
    .remove(`projects/${req.params.id}`)

  res.json({
    message: `Proyecto elminador correctamente.`,
  }).status(200);

}

async function application(req, res) {
  const project = await Project.findById(req.params.id)
  if (req.body.pre_status) {
    const application = await Application.findOneAndRemove({ project, user: req.body.user })
    await Project.findByIdAndUpdate(req.params.id,
      {
        $pull: { applications: application._id }
      })
    res.status(200)
  } else {
    const application = new Application({ project, user: req.auth.id, status: false })
    await application.save()
    await Project.findByIdAndUpdate(req.params.id,
      {
        $push: { applications: application._id }
      })
    res.status(200)
  }
}

async function exit(req, res) {
  const project = await Project.findById(req.params.id)
  const user = await User.findById(req.params.user)
  const role = await RoleProject.findOne({ project: project, members: user })
  await Project.findByIdAndUpdate(req.params.id,
    {
      $pull: { members: { member: user._id } }
    })
  await User.findByIdAndUpdate(req.params.user,
    {
      $pull: { projects: project._id, roles: role._id }
    })
  await RoleProject.findOneAndUpdate({ project: project, members: user },
    {
      $pull: { members: user._id }
    })
}





module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  application,
  exit
};
