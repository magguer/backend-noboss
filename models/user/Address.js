const { Schema, mongoose } = require("../../db");

const addressSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
