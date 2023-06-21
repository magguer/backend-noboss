const { Schema, mongoose } = require("../../db");

const bookingSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    },
    booking_date: {
      type: Date,
    },
    payment_date: {
      type: Date,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project_client: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
