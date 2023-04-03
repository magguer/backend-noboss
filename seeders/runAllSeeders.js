require("dotenv").config();
async function runAllSeeders() {
  const { mongoose } = require("../db");

  // await mongoose.connection.dropCollection("admins");
  // await mongoose.connection.dropCollection("brands");
  // await mongoose.connection.dropCollection("users");
  // await mongoose.connection.dropCollection("categories");
  // await mongoose.connection.dropCollection("products");
  // await mongoose.connection.dropCollection("status");
  // await mongoose.connection.dropCollection("orders");
  // await mongoose.connection.dropCollection("bills");

  await require("./business/categorySeeder")();
  await require("./business/clientSeeder")();
  await require("./business/discountGroupSeeder")();
  await require("./business/noboxSeeder")();
  await require("./business/productSeeder")();
  await require("./business/serviceSeeder")();
  await require("./business/subcategorySeeder")();


  await require("./payment/billSeeder")();
  await require("./payment/bookingSeeder")();
  await require("./payment/orderSeeder")();
  await require("./payment/statusSeeder")();

  await require("./project/headingSeeder")();
  await require("./project/projectSeeder")();
  await require("./project/roleProjectSeeder")();


  await require("./user/addressSeeder")();
  await require("./user/adminSeeder")();
  await require("./user/roleSeeder")();
  await require("./user/userSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();

}

runAllSeeders();
