const { Service, Project, Category, Subcategory } = require("../../models");
const defaultServices = require("../../db/services");

module.exports = async () => {
    const services = [];

    for (serviceData of defaultServices) {


        const { name, slug, sku, description, details, images_url, orders, bookings, total_bookings, price_from, price_to, cost, projects_provider, providers, } = serviceData

        const project = await Project.findOne({ slug: serviceData.project })
        const category = await Category.findOne({ slug: serviceData.category })
        const sub_category = await Subcategory.findOne({ slug: serviceData.sub_category })


        const service = new Service({
            name, slug, sku, description, details, category, sub_category, project, images_url, orders, bookings, total_bookings, price_from, price_to, cost, projects_provider, providers
        });
        services.push(service);
        project.services.push(service)
        sub_category.services.push(service)
        await project.save()
        await sub_category.save()

    }

    await Service.insertMany(services);
    console.log("[Database] Se corrió el seeder de Servicios.");
};
