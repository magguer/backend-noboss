const { Schema, mongoose } = require("../../db");

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        sku: {
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
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        total_bookings: {
            type: Number,
        },
        price_from: {
            type: Number,
            required: true,
        },
        price_to: {
            type: Number,
        },
        cost: {
            type: Number,
        },
        projects_provider: [
            {
                type: Schema.Types.ObjectId,
                ref: "Project",
            }
        ],
        provider: [
            {
                type: Object,
            }
        ]
    },
    { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
