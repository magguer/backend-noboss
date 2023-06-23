const { Schema, mongoose } = require("../../db");

const bookingStatusSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Inserte un nombre de Estado."]
        },
        slug: {
            type: String
        }
    },
    { timestamps: true }
);

const BookingStatus = mongoose.model("BookingStatus", bookingStatusSchema);
module.exports = BookingStatus;