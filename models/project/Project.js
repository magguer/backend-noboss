const { Schema, mongoose } = require("../../db");
const bcrypt = require("bcryptjs");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        role: {
          type: Schema.Types.ObjectId,
          ref: "RoleProject",
        },
        member: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    heading:
    {
      type: Schema.Types.ObjectId,
      ref: "Heading",
    },
    color_one: {
      type: String,
    },
    color_two: {
      type: String,
    },
    applications: [{
      type: Schema.Types.ObjectId,
      ref: "Application",
    }],
    notifications: [{
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
    ],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "RoleProject",
      },
    ],
    slug: {
      type: String,
      required: true,
    },
    logo_url: {
      type: String,
    },
    banner_url:
    {
      type: String,
    },
    needs: [
      {
        type: Object,
      },
    ],
    ubication: {
      type: String,
    },
    projects_favs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    public: {
      type: Boolean,
      required: true,
    },
    provider: {
      type: Boolean,
      required: true,
    },
    networks: {
      fb: {
        type: String,
      },
      ig: {
        type: String,
      },
      ln: {
        type: String,
      },
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    sub_categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    products_on: { type: Boolean },
    services_on: { type: Boolean },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
    users_client: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    projects_client: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    movements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movement",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    invested_money: {
      type: Number,
    },
    sales_money: {
      type: Number,
    },
    spent_money: {
      type: Number,
    },
    banned: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);



const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
