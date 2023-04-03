const { Schema, mongoose } = require("../../db");

const headingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Heading = mongoose.model("Heading", headingSchema);

module.exports = Heading;
