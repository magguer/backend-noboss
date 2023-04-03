const { faker } = require("@faker-js/faker");
const { RoleProject } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const roleProjects = [];

    for (let i = 0; i <= Number(process.env.TOTAL_ROLEPROJECT); i++) {
        const roleProject = new RoleProject({
        });
        roleProjects.push(roleProject);
    }
    await RoleProject.insertMany(roleProjects);
    console.log("[Database] Se corrió el seeder de Roles de Projecto.");
};
