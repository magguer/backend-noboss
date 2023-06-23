const { Schema, mongoose } = require("../../db");

const orderSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    order_status: {
      type: Schema.Types.ObjectId,
      ref: "Status",
    },
    payment_date: {
      type: Date,
    },
    shipping_date: {
      type: Date,
    },
    arrival_date: {
      type: Date,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client"
    },
    user_client: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    project_client: {
      type: Schema.Types.ObjectId,
      ref: "Project"
    },
    products: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service"
    },
    details: [{}],
    total_price: {
      type: Number,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
