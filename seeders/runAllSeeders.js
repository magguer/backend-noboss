require("dotenv").config();
async function runAllSeeders() {
  const { mongoose } = require("../db");

  await mongoose.connection.dropDatabase();
  // await mongoose.connection.dropCollection("addresses");
  // await mongoose.connection.dropCollection("roleadmins");
  // await mongoose.connection.dropCollection("admins");
  // await mongoose.connection.dropCollection("users");
  // await mongoose.connection.dropCollection("headings");
  // await mongoose.connection.dropCollection("projects");
  // await mongoose.connection.dropCollection("roleprojects");
  // await mongoose.connection.dropCollection("categories");
  // await mongoose.connection.dropCollection("subcategories");
  // await mongoose.connection.dropCollection("products");
  // await mongoose.connection.dropCollection("clients");

  await require("./user/addressSeeder")();
  await require("./user/roleAdminSeeder")();
  await require("./user/adminSeeder")();
  await require("./user/userSeeder")();

  await require("./project/headingSeeder")();
  await require("./project/projectSeeder")();
  await require("./project/roleProjectSeeder")();

  await require("./business/categorySeeder")();
  await require("./business/subcategorySeeder")();
  await require("./business/productSeeder")();
  await require("./business/serviceSeeder")();
  await require("./business/clientSeeder")();
  await require("./payment/bookingSeeder")();
  /*await require("./business/discountGroupSeeder")();
 await require("./business/noboxSeeder")();


 await require("./payment/billSeeder")();

 await require("./payment/orderSeeder")();
 await require("./payment/statusSeeder")(); */


  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();

}

runAllSeeders();
