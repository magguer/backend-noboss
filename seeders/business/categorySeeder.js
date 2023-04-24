const { faker } = require("@faker-js/faker");
const { Category, Project } = require("../../models");
const defaultCategories = require("../../db/categories")

faker.locale = "es";

module.exports = async () => {
  const categories = [];

  for (let categoryData of defaultCategories) {
    const { name, slug, img_url, sub_categories } = categoryData
    const project = await Project.findOne({ slug: categoryData.project })
    const category = new Category({
      name,
      slug,
      img_url,
      project,
      sub_categories
    })
    categories.push(category)

    project.categories.push(category)
    await project.save()

  }

  await Category.insertMany(categories);
  console.log("[Database] Se corrió el seeder de Categories.");
};
