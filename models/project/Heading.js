const { Schema, mongoose } = require("../../db");

const headingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        slug: {
            type: String,
            required: true,
        },
        icon_url: {
            type: String,
        },
        image_url: {
            type: String,
        },
        projects: [{
            type: Schema.Types.ObjectId,
            ref: "Project",
        }],
    },
    { timestamps: true }
);

const Heading = mongoose.model("Heading", headingSchema);

module.exports = Heading;
