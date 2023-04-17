const { faker } = require("@faker-js/faker");
const { Admin, RoleAdmin } = require("../../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {

  const rolAdmin = await RoleAdmin.findOne({ name: "Administrador" });

  const admin = {
    username: "admin-nbss",
    firstname: "admin",
    lastname: "noboss",
    email: "admin@noboss.com",
    password: await bcrypt.hash("1234", 8),
    rol: rolAdmin,
  };

  rolAdmin.admins.push(admin._id)
  rolAdmin.save()

  await Admin.create(admin);
  console.log("[Database] Se corrió el seeder de Admins.");
};
