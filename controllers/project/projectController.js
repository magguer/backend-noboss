const { default: slugify } = require("slugify");
const { Project, RoleProject, Heading, User } = require("../../models");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Display a listing of projects.
async function index(req, res) {
  if (req.query.public === "true") {
    const projects = await Project.find({ public: true }).populate("headings").populate("movements");
    return res.json(projects);
  } else {
    const projects = await Project.find().populate("headings").populate("movements");
    res.json(projects);
  }
}


// Display the specified resource.
async function show(req, res) {
  const projectSlug = req.params.slug;
  const project = await Project.findOne({ slug: projectSlug }).populate("movements");
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
        const { data, error } = await supabase.storage
          .from("imgs/projects/logos")
          .upload(newFileName, fs.createReadStream(files.logo_url.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.logo_url.mimetype,
            duplex: "half",
          });

        const user = await User.findById(req.auth.id)

        const heading = await Heading.findOne({ slug: fields.heading })

        const role = new RoleProject({
          name: "Administrador",
          slug: "administrador",
          description: "Usuario administrador del Proyecto.",
          members: [req.auth.id]
        })

        const project = new Project({
          name: fields.name,
          password: fields.password,
          members: [{ role, member: req.auth.id }],
          headings: [heading._id],
          color_one: "#02997d",
          color_two: "#c9c9c9",
          roles: [role],
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

        user.projects.push(project.id)
        heading.projects.push(project.id)
        role.project = project.id
        await user.save()
        await role.save()
        await heading.save()

        const newProject = await Project.findById(project.id).populate(["headings", "roles", "sub_categories", "categories", "movements", { path: "members", populate: ["role", "member"] }])
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
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) {
  const projectId = req.params.id;
  const deletedProject = await Project.findById(projectId);
  await Project.findOneAndDelete({ id: projectId });
  res.json({
    message: `The Admin ${deletedProject.name} was deleted`,
  });
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
