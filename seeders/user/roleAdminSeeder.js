const { faker } = require("@faker-js/faker");
const { RoleAdmin } = require("../../models");

faker.locale = "es";

const defaultRoleAdmins = [
    {
        name: "Administrador",
        description: "Equipo de administración.",
        level: 500,
        admins: []
    },
    {
        name: "Moderador",
        description: "Equipo de moderación.",
        level: 500,
        admins: []
    }
]

module.exports = async () => {
    const rolesAdmin = [];

    for (let roleAdminData of defaultRoleAdmins) {

        const roleAdmin = new RoleAdmin({
            name: roleAdminData.name,
            description: roleAdminData.description,
            level: roleAdminData.level,
            admins: roleAdminData.admins
        });

        rolesAdmin.push(roleAdmin);
    }

    await RoleAdmin.insertMany(rolesAdmin);
    console.log("[Database] Se corrió el seeder de Roles Admin.");
};
