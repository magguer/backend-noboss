
// bussiness 
const Category = require("./business/Category");
const Subcategory = require("./business/Subcategory")
const Product = require("./business/Product");
const Service = require("./business/Service");
const Nobox = require("./business/Nobox");
const DiscountGroups = require("./business/DiscountGroup");
const Client = require("./business/Client");

// payment 
const Booking = require("./payment/Booking");
const Order = require("./payment/Order");
const Status = require("./payment/Status");
const Bill = require("./payment/Bill");

// project 
const Project = require("./project/Project");
const Heading = require("./project/Heading");
const RoleProject = require("./project/RoleProject");

// user 
const Admin = require("./user/Admin");
const RoleAdmin = require("./user/RoleAdmin");
const User = require("./user/User");
const Address = require("./user/Address");


module.exports = {
  Category,
  Subcategory,
  Product,
  Service,
  Nobox,
  DiscountGroups,
  Client,

  Booking,
  Order,
  Status,
  Bill,

  Project,
  Heading,
  RoleProject,

  Admin,
  RoleAdmin,
  User,
  Address,
};
