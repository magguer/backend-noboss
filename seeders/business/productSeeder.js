const { faker } = require("@faker-js/faker");
const { Product, Project, Subcategory, } = require("../../models");
const defaultProducts = require("../../db/products");

module.exports = async () => {
  const products = [];

  for (let productData of defaultProducts) {

    const { name, slug, subname, description, details, images_url, orders, price, cost, stock, providers } = productData

    const project = await Project.findOne({ slug: productData.project })
    const subcategories = []

    for (let subcategoryData of productData.subcategories) {
      const subcategory = await Subcategory.findOne({ slug: subcategoryData })
      subcategories.push(subcategory)
    }

    const product = new Product({
      name, slug, subname, description, details, subcategories, project, images_url, orders, price, cost, stock, providers

    });
    products.push(product);

    for (let subcategory of subcategories) {
      subcategory.products.push(product)
      await subcategory.save()
    }

  }

  await Product.insertMany(products);

  console.log("[Database] Se corrió el seeder de Product.");
};
