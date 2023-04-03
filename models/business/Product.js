const { Schema, mongoose } = require("../../db");

const productSchema = new Schema(
  {
    name: {
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
    slug: {
      type: String,
      required: true,
    },
    subcategory: {
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
    providers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
