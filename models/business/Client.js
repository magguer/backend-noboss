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
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        adress: {
            type: Schema.Types.ObjectId,
            ref: "Adress",
        }
    },
    { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
