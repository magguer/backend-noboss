const { Schema, mongoose } = require("../../db");

const addressSchema = new Schema(
    {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        zone: {
            type: String,
        },
        zip: {
            type: Number,
        },
        street1: {
            type: String,
        },
        street2: {
            type: String,
        },
        number: {
            type: Number,
        },
        extra: {
            type: String,
        },
    },
    { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
