const { Schema, mongoose } = require("../../db");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    img_url: {
      type: String
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    sub_categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subcategory",
      }
    ],
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
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
