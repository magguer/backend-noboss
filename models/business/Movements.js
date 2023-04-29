const { Schema, mongoose } = require("../../db");

const movementSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: "Client",
        },
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
        amount: {
            type: Number
        }
    },
    { timestamps: true }
);

const Movement = mongoose.model("Movement", movementSchema);

module.exports = Movement;