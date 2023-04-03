const { Schema, mongoose } = require("../../db");

const noboxSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Nobox = mongoose.model("Nobox", noboxSchema);

module.exports = Nobox;
