const { faker } = require("@faker-js/faker");
const Project = require("../models/Project");

faker.locale = "es";

let projectsArr = [
  {
    name: "Gibson",
    slug: "gibson",
    logo: "GIBSON-LOGO-WHITE-1.png",
    logo2: "GIBSON-LOGO-1.png",
    products: [],
  },
  {
    name: "Fender",
    slug: "fender",
    logo: "FENDER-LOGO-WHITE-1.png",
    logo2: "FENDER-LOGO-1.png",
    products: [],
  },
  {
    name: "PRS",
    slug: "prs",
    logo: "PRS-LOGO-WHITE-1.png",
    logo2: "PRS-LOGO-1.png",
    products: [],
  },
  {
    name: "Universal Audio",
    slug: "universal-audio",
    logo: "UA-LOGO-WHITE-1.png",
    logo2: "UA-LOGO-1.png",
    products: [],
  },
  {
    name: "Neumann",
    slug: "neumann",
    logo: "NEUMANN-LOGO-WHITE-1.png",
    logo2: "NEUMANN-LOGO-1.png",
    products: [],
  }
];

module.exports = async () => {
  const projects = [];

  for (let itemBrand of projectsArr) {
    const project = new Project({
      name: project.name,
      slug: project.slug,
      logo: project.logo,
      logo2: project.logo2,
      products: project.products,
    });
    projects.push(project);
  }

  await Project.insertMany(projects);

  console.log("[Database] Se corrió el seeder de Projecto.");
};
