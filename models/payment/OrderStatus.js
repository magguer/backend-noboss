const { Schema, mongoose } = require("../../db");

const orderStatusSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Inserte un nombre de Estado."]
        },
        slug: {
            type: String
        }
    },
    { timestamps: true }
);

const OrderStatus = mongoose.model("OrderStatus", orderStatusSchema);
module.exports = OrderStatus;