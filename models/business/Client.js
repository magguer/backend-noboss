const { Schema, mongoose } = require("../../db");

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order",
        }],
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        bookings: {
            type: Schema.Types.ObjectId,
            ref: "Adress",
        },
        phone: {
            type: String
        }
    },
    { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
