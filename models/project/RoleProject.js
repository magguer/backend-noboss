const { Schema, mongoose } = require("../../db");

const roleProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const RoleProject = mongoose.model("RoleProject", roleProjectSchema);

module.exports = RoleProject;
