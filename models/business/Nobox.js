const { Schema, mongoose } = require("../../db");

const noboxSchema = new Schema(
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
        projects: [{
            type: Schema.Types.ObjectId,
            ref: "Project",
        }],
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
    },
    { timestamps: true }
);

const Nobox = mongoose.model("Nobox", noboxSchema);

module.exports = Nobox;
