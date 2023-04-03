const { Schema, mongoose } = require("../../db");

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
