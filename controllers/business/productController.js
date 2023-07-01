const { Product, Project, Category, Subcategory } = require("../../models");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const { default: slugify } = require("slugify");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Display a listing of the resource.
async function index(req, res) {
  const project = await Project.findById(req.query.project);
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    const products = await Product.find({
      project,
      slug: { $regex: regex },
    })
      .populate("sub_category")
      .populate({ path: "category", populate: "sub_categories" })
      .sort({ sales_quantity: 'desc' })
      .lean();
    return res.json(products);
  } else {
    const products = await Product.find({ project })
      .populate("sub_category")
      .populate({ path: "category", populate: "sub_categories" })
      .sort({ sales_quantity: 'desc' })
      .limit(req.query.best ? 5 : null)
      .lean();
    res.json(products);
  }
}

// Display the specified resource.
async function show(req, res) {
  const product = await Product.findById(req.params.id)
    .populate("sub_category")
    .populate("category")
    .populate({ path: "project", populate: "products" });
  res.json(product);
}

// Show the form for creating a new resource
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
      if (files.images) {
        let arrImages = [];
        if (files.images.length > 0) {
          for (let image of files.images) {
            const ext = path.extname(image.filepath);
            const newFileName = `image_${Date.now()}${ext}`;
            const { data, error } = await supabase.storage
              .from("imgs/projects/products")
              .upload(newFileName, fs.createReadStream(image.filepath), {
                cacheControl: "3600",
                upsert: false,
                contentType: image.mimetype,
                duplex: "half",
              });
            arrImages.push(newFileName);
          }
        } else {
          const ext = path.extname(files.images.filepath);
          const newFileName = `image_${Date.now()}${ext}`;
          const { data, error } = await supabase.storage
            .from("imgs/projects/products")
            .upload(newFileName, fs.createReadStream(files.images.filepath), {
              cacheControl: "3600",
              upsert: false,
              contentType: files.images.mimetype,
              duplex: "half",
            });
          arrImages.push(newFileName);
        }

        const category = await Category.findById(
          fields.category,
        );

        const sub_category = await Subcategory.findById(fields.sub_category
        );

        const project = await Project.findById(fields.project);

        const product = new Product({
          model: fields.model,
          slug: slugify(fields.model).toLowerCase(),
          sku: fields.sku,
          description: fields.description,
          images_url: arrImages,
          details: fields.details,
          category: category._id,
          sub_category: sub_category._id,
          project: project._id,
          sales_quantity: 0,
          price: fields.price,
          cost: fields.cost,
          stock: fields.stock,
        });
        await product.save();

        sub_category.products.push(product._id);
        project.products.push(product._id);
        await sub_category.save();
        await project.save();

        const newProduct = await Product.findById(product.id)
          .populate("sub_category")
          .populate("category");

        return res.json(newProduct);
      }
    });
  } catch (error) {
    res.json(error);
  }
}

// Patch Product
async function update(req, res) {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }

    const sub_category = await Subcategory.findById(fields.sub_category);
    const category = await Category.findById(fields.category);
    const product = await Product.findById(fields.product);

    await Subcategory.findByIdAndUpdate(
      fields.oldSub_category,
      { $pull: { products: product._id } }
    );

    if (files.images) {
      let arrImages = [];
      if (files.images.length > 0) {
        for (let image of files.images) {
          const ext = path.extname(image.filepath);
          const newFileName = `image_${Date.now()}${ext}`;
          const { data, error } = await supabase.storage
            .from("imgs/projects/products")
            .upload(newFileName, fs.createReadStream(image.filepath), {
              cacheControl: "3600",
              upsert: false,
              contentType: image.mimetype,
              duplex: "half",
            });
          arrImages.push(newFileName);
        }
      } else {
        const ext = path.extname(files.images.filepath);
        const newFileName = `image_${Date.now()}${ext}`;
        const { data, error } = await supabase.storage
          .from("imgs/projects/products")
          .upload(newFileName, fs.createReadStream(files.images.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.images.mimetype,
            duplex: "half",
          });
        arrImages.push(newFileName);
      }
      const filesProduct = await Product.findById(fields.product);
      const product = await Product.findByIdAndUpdate(
        fields.product,
        {
          model: fields.model,
          sku: fields.sku,
          description: fields.description,
          images_url: [...filesProduct.images_url, ...arrImages],
          details: fields.details,
          category: category._id,
          sub_category: sub_category._id,
          price: fields.price,
          stock: fields.stock,
          cost: fields.cost,
          subtitle: fields.subtitle,
          description: fields.description,
        },
        { returnOriginal: false }
      )
        .populate("sub_category")
        .populate("category");

      sub_category.products.push(product);
      await sub_category.save();
      return res.json(product);
    } else {
      const product = await Product.findByIdAndUpdate(
        fields.product,
        {
          model: fields.model,
          sku: fields.sku,
          description: fields.description,
          details: fields.details,
          category: category._id,
          sub_category: sub_category._id,
          price: fields.price,
          stock: fields.stock,
          cost: fields.cost,
          subtitle: fields.subtitle,
          description: fields.description,
        },
        { returnOriginal: false }
      )
        .populate("sub_category")
        .populate("category");
      sub_category.products.push(product);
      await sub_category.save();
      return res.json(product);
    }
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const productId = req.params.id;
  const product = await Product.findOneAndDelete({ id: productId });
  res.json({ message: "The Product was deleted", productDeleted: product });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
