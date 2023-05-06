const { Schema, mongoose } = require("../../db");
const bcrypt = require("bcryptjs");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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
    headings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Heading",
      },
    ],
    color_one: {
      type: String,
    },
    color_two: {
      type: String,
    },
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
    banners_url: [
      {
        type: String,
      },
    ],
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

// No Password in JWT
projectSchema.methods.toJSON = function () {
  const project = this.toObject();
  project.id = project._id.toString();
  delete project.password;
  return project;
};

// Bcrypt - Password
projectSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
