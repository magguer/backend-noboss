const { Schema, mongoose } = require("../../db");

const productSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    subname: {
      type: String,
    },
    description: {
      type: String,
    },
    details: {
      type: Object,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    images_url: [
      {
        type: String,
        required: true,
      },
    ],
    orders: [{
      type: Schema.Types.ObjectId,
      ref: "Order",
    }],
    price: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    projects_provider: [{
      type: Schema.Types.ObjectId,
      ref: "Project",
    }],
    providers: [
      {
        type: Object,

      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
