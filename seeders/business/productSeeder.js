const { Product, Project, Subcategory, Category } = require("../../models");
const defaultProducts = require("../../db/products");

module.exports = async () => {
  const products = [];

  for (let productData of defaultProducts) {

    const { model, slug, sku, subname, description, details, images_url, orders, price, cost, stock, providers } = productData

    const project = await Project.findOne({ slug: productData.project })
    const category = await Category.findOne({ slug: productData.category })
    const sub_category = await Subcategory.findOne({ slug: productData.sub_category })



    const product = new Product({
      model, slug, sku, subname, description, details, category, sub_category, project, images_url, orders, price, cost, stock, providers

    });
    products.push(product);

    sub_category.products.push(product)
    await sub_category.save()

  }

  await Product.insertMany(products);

  console.log("[Database] Se corrió el seeder de Product.");
};
