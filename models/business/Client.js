const { Schema, mongoose } = require("../../db");

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        type: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order",
        }],
        orders_quantity: {
            type: Number
        },
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        bookings_quantity: {
            type: Number
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        }
    },
    { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
