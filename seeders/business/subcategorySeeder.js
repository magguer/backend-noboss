const { faker } = require("@faker-js/faker");
const { Subcategory, Project, Category } = require("../../models");
const defaultSubcategories = require("../../db/subcategories");

faker.locale = "es";

module.exports = async () => {
    const sub_categories = [];

    for (let sub_categoryData of defaultSubcategories) {
        const { name, slug, image_url, products, services } = sub_categoryData

        const project = await Project.findOne({ slug: sub_categoryData.project })
        const category = await Category.findOne({ slug: sub_categoryData.category })

        const subcategory = new Subcategory({
            name,
            slug,
            image_url,
            project,
            category,
            products,
            services
        });
        sub_categories.push(subcategory);

        project.sub_categories.push(subcategory)
        category.sub_categories.push(subcategory)

        await project.save()
        await category.save()


    }
    await Subcategory.insertMany(sub_categories);
    console.log("[Database] Se corrió el seeder de Subcategory.");
};
