const { faker } = require("@faker-js/faker");
const { User, Address } = require("../../models");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const defaultUsers = require("../../db/users")

faker.locale = "es";

module.exports = async () => {
  const users = [];

  const address = await Address.findOne({ country: "Uruguay" });

  /* Random Users */

  for (let i = 0; i <= Number(process.env.TOTAL_USERS); i++) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const user = new User({
      username: slugify(`${firstname}_${lastname}`, {
        replacement: "-",
        lower: true,
        locale: "en",
      }),
      email: slugify(`${firstname}_${lastname}@gmail.com`, {
        replacement: "-",
        lower: true,
        locale: "en",
      }),
      phone: "092683955",
      firstname,
      lastname,
      photo_url: faker.image.avatar(),
      password: await bcrypt.hash("1234", 8),
      addresses: [address],
      projects: [],
      banned: false
    });
    users.push(user);
  }

  /* Specific Users */

  for (let userData of defaultUsers) {
    const { username, email, phone, firstname, lastname, photo_url, password, projects, banned } = userData
    const user = new User({
      username,
      email,
      phone,
      firstname,
      lastname,
      photo_url,
      password: await bcrypt.hash(password, 8),
      addresses: [address],
      projects,
      banned,
    })
    users.push(user)
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
