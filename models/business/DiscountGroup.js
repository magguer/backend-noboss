const { Schema, mongoose } = require("../../db");

const discountGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const DiscountGroup = mongoose.model("DiscountGroup", discountGroupSchema);

module.exports = DiscountGroup;
