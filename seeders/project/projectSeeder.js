const { faker } = require("@faker-js/faker");
const { Project, Heading } = require("../../models/index");
const defaultProjects = require("../../db/projects");

faker.locale = "es";

module.exports = async () => {
  const projects = [];

  for (let projectData of defaultProjects) {
    const heading = await Heading.findOne({ slug: projectData.heading });
    const project = new Project({
      _id: projectData._id,
      name: projectData.name,
      slug: projectData.slug,
      members: [],
      roles: projectData.roles,
      heading: heading,
      color_one: projectData.color_one,
      color_two: projectData.color_two,
      roles: projectData.roles,
      logo_url: projectData.logo_url,
      banner_url: projectData.banner_url,
      needs: projectData.needs,
      ubication: projectData.ubication,
      projects_fav: projectData.projects_fav,
      public: projectData.public,
      provider: projectData.provider,
      networks: {
        fb: projectData.networks.fb,
        ig: projectData.networks.ig,
        ln: projectData.networks.ln,
      },
      products_on: projectData.products_on,
      services_on: projectData.services_on,
      products: projectData.products,
      services: projectData.services,
      users_client: projectData.users_client,
      projects_client: projectData.projects_client,
      orders: projectData.orders,
      bookings: projectData.bookings,
      invested_money: projectData.invested_money,
      sales_money: projectData.sales_money,
      spent_money: projectData.spent_money,
      banned: projectData.banned,
    });

    projects.push(project);
    heading.projects.push(project._id);
    heading.save();
  }

  await Project.insertMany(projects);
  console.log("[Database] Se corrió el seeder de Projects.");
};
