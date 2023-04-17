const { Schema, mongoose } = require("../../db");

const roleAdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        level: {
            type: Number,
            required: true,
        },
        admins: [
            {
                type: Schema.Types.ObjectId,
                ref: "Admin",
            },
        ]
    },
    { timestamps: true }
);

const RoleAdmin = mongoose.model("RoleAdmin", roleAdminSchema);

module.exports = RoleAdmin;
