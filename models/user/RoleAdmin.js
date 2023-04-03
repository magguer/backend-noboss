const { Schema, mongoose } = require("../../db");

const roleAdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const RoleAdmin = mongoose.model("RoleAdmin", roleAdminSchema);

module.exports = RoleAdmin;
