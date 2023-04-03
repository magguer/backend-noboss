const { Schema, mongoose } = require("../../db");

const billSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    project_client: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    products: [{
      type: Object,
      required: [true, "Inserte almenos un producto."],
    }],
    service: {
      type: Object,
      required: [true, "Inserte almenod un servicio."],
    },
    details: [{}],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);
module.exports = Bill;
