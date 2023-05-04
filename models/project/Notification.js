const { Schema, mongoose } = require("../../db");

const notificationSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notificaton", notificationSchema);

module.exports = Notification;
