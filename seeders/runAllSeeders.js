require("dotenv").config();
async function runAllSeeders() {
  const { mongoose } = require("../db");

  await mongoose.connection.dropDatabase();

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
  await require("./business/clientSeeder")();
  /*await require("./business/discountGroupSeeder")();
 await require("./business/noboxSeeder")();
 await require("./business/serviceSeeder")();

 
 
 await require("./payment/billSeeder")();
 await require("./payment/bookingSeeder")();
 await require("./payment/orderSeeder")();
 await require("./payment/statusSeeder")(); */





  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();

}

runAllSeeders();
