const { Schema, mongoose } = require("../../db");

const bookingSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    booking_status: {
      type: Schema.Types.ObjectId,
      ref: "BookingStatus",
    },
    booking_date: {
      type: Date,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
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
