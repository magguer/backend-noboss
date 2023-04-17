const { Schema, mongoose } = require("../../db");

const discountGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        headings: [{
            type: Schema.Types.ObjectId,
            ref: "Heading",
        }],
        products: [{
            type: Schema.Types.ObjectId,
            ref: "Product",
        }],
        services: [{
            type: Schema.Types.ObjectId,
            ref: "Project",
        }],
        clients: [{
            type: Schema.Types.ObjectId,
            ref: "Client",
        }],
        totalPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
        }

    },
    { timestamps: true }
);

const DiscountGroup = mongoose.model("DiscountGroup", discountGroupSchema);

module.exports = DiscountGroup;
