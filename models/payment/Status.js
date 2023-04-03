const { Schema, mongoose } = require("../../db");

const statusSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Inserte un nombre de Estado."]
        },
        orders: [{
            type: Schema.Types.ObjectId,
            ref: "Order",
        }],
        bookings: [{
            type: Schema.Types.ObjectId,
            ref: "Booking",
        }],
        users_client: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        project_client: [{
            type: Schema.Types.ObjectId,
            ref: "Project",
        }],

    },
    { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;