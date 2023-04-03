const { Schema, mongoose } = require("../../db");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    headings: [{
      type: Schema.Types.ObjectId,
      ref: "Heading",
    }],
    slug: {
      type: String,
      required: true,
    },
    logo_url:
    {
      type: String,
      required: true,
    },
    banners_url: [{
      type: String,
    }],
    needs: [{
      type: Object,
      required: true,
    }],
    ubication: {
      type: String
    },
    projects_favs: [{
      type: Schema.Types.ObjectId,
      ref: "Project",
    }],
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
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product",
    }],
    services: [{
      type: Schema.Types.ObjectId,
      ref: "Service",
    }],
    users_client: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    projects_client: [{
      type: Schema.Types.ObjectId,
      ref: "Project",
    }],
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
    investedMoney: {
      type: Number,
    },
    billingMoney: {
      type: Number,
    },
    availableMoney: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
