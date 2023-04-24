const { faker } = require("@faker-js/faker");
const { Project, Heading } = require("../../models/index");
const bcrypt = require("bcryptjs");
const defaultProjects = require("../../db/projects");

faker.locale = "es";

module.exports = async () => {
  const projects = [];

  for (let projectData of defaultProjects) {

    const heading = await Heading.findOne({ slug: projectData.headings[0] })

    const project = new Project({
      name: projectData.name,
      slug: projectData.slug,
      password: await bcrypt.hash(projectData.password, 8),
      members: [],
      roles: projectData.roles,
      headings: heading,
      roles: projectData.roles,
      logo_url: projectData.logo_url,
      banners_url: projectData.banners_url,
      needs: projectData.needs,
      ubication: projectData.ubication,
      projects_fav: projectData.projects_fav,
      public: projectData.public,
      provider: projectData.provider,
      networks: {
        fb: projectData.networks.fb,
        ig: projectData.networks.ig,
        ln: projectData.networks.ln
      },
      products: projectData.products,
      services: projectData.services,
      users_client: projectData.users_client,
      projects_client: projectData.projects_client,
      orders: projectData.orders,
      bookings: projectData.bookings,
      invested_money: projectData.invested_money,
      billing_money: projectData.billing_money,
      available_money: projectData.available_money,
      banned: projectData.banned
    });
    projects.push(project);
    heading.projects.push(project._id)
    heading.save()
  }

  await Project.insertMany(projects);
  console.log("[Database] Se corrió el seeder de Projects.");
};
