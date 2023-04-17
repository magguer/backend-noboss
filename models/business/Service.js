const { Schema, mongoose } = require("../../db");

const serviceSchema = new Schema(
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
        subcategories: [{
            type: Schema.Types.ObjectId,
            ref: "Subcategory",
        }],
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
        totalBookings: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        cost: {
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

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
