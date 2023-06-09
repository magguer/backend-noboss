// bussiness 
const categoryRoutes = require("./business/categoryRoutes");
const clientRoutes = require("./business/clientRoutes");
const discountGroupRoutes = require("./business/discountGroupRoutes");
const noboxRoutes = require("./business/noboxRoutes");
const productRoutes = require("./business/productRoutes");
const serviceRoutes = require("./business/serviceRoutes");
const subcategoryRoutes = require("./business/subcategoryRoutes");
const movementRoutes = require("./business/movementRoutes");

// payment 
const billRoutes = require("./payment/billRoutes");
const bookingRoutes = require("./payment/bookingRoutes");
const orderRoutes = require("./payment/orderRoutes");
const statusRoutes = require("./payment/statusRoutes");

// project
const headingRoutes = require("./project/headingRoutes");
const applicationRoutes = require("./project/applicationRoutes");
const projectRoutes = require("./project/projectRoutes");
const roleProjectRoutes = require("./project/roleProjectRoutes");

// user 
const addressRoutes = require("./user/addressRoutes");
const adminRoutes = require("./user/adminRoutes");
const roleAdminRoutes = require("./user/roleAdminRoutes");
const userRoutes = require("./user/userRoutes");

module.exports = (app) => {
  app.use("/category", categoryRoutes);
  app.use("/clients", clientRoutes);
  app.use("/discountGroup", discountGroupRoutes);
  app.use("/nobox", noboxRoutes);
  app.use("/products", productRoutes);
  app.use("/services", serviceRoutes);
  app.use("/subcategory", subcategoryRoutes);
  app.use("/movement", movementRoutes);

  app.use("/bill", billRoutes);
  app.use("/booking", bookingRoutes);
  app.use("/status", statusRoutes);
  app.use("/order", orderRoutes);

  app.use("/heading", headingRoutes);
  app.use("/application", applicationRoutes);
  app.use("/project", projectRoutes);
  app.use("/roleProject", roleProjectRoutes);

  app.use("/address", addressRoutes);
  app.use("/admin", adminRoutes);
  app.use("/roleAdmin", roleAdminRoutes);
  app.use("/user", userRoutes);

};
