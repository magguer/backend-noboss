
// bussiness 
const Category = require("./business/Category");
const Subcategory = require("./business/Subcategory")
const Product = require("./business/Product");
const Service = require("./business/Service");
const Movement = require("./business/Movement");
const Nobox = require("./business/Nobox");
const DiscountGroups = require("./business/DiscountGroup");
const Client = require("./business/Client");

// payment 
const Booking = require("./payment/Booking");
const BookingStatus = require("./payment/BookingStatus");
const Order = require("./payment/Order");
const OrderStatus = require("./payment/OrderStatus");
const Bill = require("./payment/Bill");

// project 
const Project = require("./project/Project");
const Application = require("./project/Application");
const Notification = require("./project/Notification");
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
  Movement,
  Nobox,
  DiscountGroups,
  Client,

  Booking,
  BookingStatus,
  Order,
  OrderStatus,
  Bill,

  Project,
  Application,
  Notification,
  Heading,
  RoleProject,

  Admin,
  RoleAdmin,
  User,
  Address,
};
