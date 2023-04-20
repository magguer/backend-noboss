const { faker } = require("@faker-js/faker");
const { Product, Project } = require("../../models");
const defaultProducts = require("../../db/products");

module.exports = async () => {
  const products = [];

  for (let productData of defaultProducts) {

    const { name, slug, subname, description, details, subcategories, project, images_url, orders, price, cost, stock, providers } = productData

    const projectModel = await Project.findOne({ slug: project })

    const product = new Product({
      name, slug, subname, description, details, subcategories, project: projectModel, images_url, orders, price, cost, stock, providers

    });
    products.push(product);
  }

  await Product.insertMany(products);

  console.log("[Database] Se corrió el seeder de Product.");
};
