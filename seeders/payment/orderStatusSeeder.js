const { OrderStatus } = require("../../models");
const defaultOrderStatus = require("../../db/orderStatus")

module.exports = async () => {
  const AllOrderStatus = [];

  for (let statusOrderData of defaultOrderStatus) {
    const orderStatus = new OrderStatus(statusOrderData);
    AllOrderStatus.push(orderStatus);
  }

  await OrderStatus.insertMany(AllOrderStatus);

  console.log("[Database] Se corrió el seeder de Order Status.");
}
