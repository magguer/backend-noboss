const { Schema, mongoose } = require("../../db");

const subcategorySchema = new Schema(
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
        categorie: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
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

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
