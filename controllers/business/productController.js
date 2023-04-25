const { Product, Project, Category, Subcategory } = require("../../models");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// Display a listing of the resource.
async function index(req, res) {
  const project = await Project.find({ slug: req.query.project });
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    const products = await Product.find({
      project,
      slug: { $regex: regex },
    }).populate("sub_category").lean();
    return res.json(products);
  } else {
    const products = await Product.find({ project }).populate("sub_category").lean();
    res.json(products);
  }
}

// Display the specified resource.
async function show(req, res) {
  const productSlug = req.params.slug;
  const product = await Product.findOne({ slug: productSlug }).populate("sub_category").populate("category")
  res.json(product);
}

// Show the form for creating a new resource
async function store(req, res) {
  const form = formidable({
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
    multiples: true,
  });
  form.parse(req, async (err, fields, files) => {
    const brand = await Brand.findOne({ name: fields.brand });
    const category = await Category.findOne({ name: fields.category });
    const newProduct = await Product.create(
      {
        brand: brand._id,
        model: fields.model,
        slug: fields.slug,
        image: [files.image1.newFilename, files.image2.newFilename],
        highlight: fields.highlight,
        price: fields.price,
        stock: fields.stock,
        subtitle: fields.subtitle,
        description: fields.description,
        category: "641e002fad73e0e0a7abdfbb",
      },
      { returnOriginal: false }
    );
    brand.products.push(newProduct._id);
    category.products.push(newProduct._id);
    brand.save();
    category.save();
    res.json(newProduct);
  });
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
    const sub_category = await Subcategory.findOne({ slug: fields.sub_category });
    const product = await Product.findById(fields.product);
    await Subcategory.findOneAndUpdate(
      { slug: fields.oldSub_category },
      { $pull: { products: product._id } }
    )
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
          sku: fields.slug,
          description: fields.description,
          price: fields.price,
          stock: fields.stock,
          cost: fields.cost,
          subtitle: fields.subtitle,
          description: fields.description,
          images_url: [...filesProduct.images_url, ...arrImages],
        },
        { returnOriginal: false }
      ).populate("sub_category").populate("category");

      sub_category.products.push(product);
      await sub_category.save();
      return res.json(product);
    } else {
      const product = await Product.findByIdAndUpdate(
        fields.product,
        {
          model: fields.model,
          sku: fields.slug,
          description: fields.description,
          price: fields.price,
          stock: fields.stock,
          cost: fields.cost,
          subtitle: fields.subtitle,
          description: fields.description,
        },
        { returnOriginal: false }
      ).populate("sub_category").populate("category");
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
