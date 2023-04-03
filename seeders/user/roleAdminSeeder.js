const { faker } = require("@faker-js/faker");
const { RoleAdmin } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const rolesAdmin = [];

    for (let i = 0; i <= Number(process.env.TOTAL_ROLE_ADMIN); i++) {
        const roleAdmin = new RoleAdmin({
        });
        rolesAdmin.push(roleAdmin);
    }
    await Address.insertMany(rolesAdmin);
    console.log("[Database] Se corrió el seeder de Roles Admin.");
};
