const { Schema, mongoose } = require("../../db");

const applicationSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        status: { type: Boolean }
    },
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
