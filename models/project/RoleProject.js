const { Schema, mongoose } = require("../../db");

const roleProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        matriz: {},
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }]
    },
    { timestamps: true }
);

const RoleProject = mongoose.model("RoleProject", roleProjectSchema);

module.exports = RoleProject;
