const { Order, Status, User, Product } = require("../../models");


module.exports = async () => {

  const status = await Status.findOne({ name: "Processing" });
  const users = await User.find()
  const products = await Product.find()
  const orders = []

  for (let user of users) {
    const random = Math.floor(Math.random() * 20)
    const order = new Order({
      status: status._id,
      user: user,
      products: [products[random], products[random + 1]],
      details: [{
        brand: products[random].brand,
        model: products[random].model,
        price: products[random].price,
      }, {
        brand: products[random + 1].brand,
        model: products[random + 1].model,
        price: products[random + 1].price,
      }],
      totalPrice: products[random].price + products[random + 1].price
    });

    user.orders.push(order._id)
    products[random].orders.push(order._id)
    status.orders.push(order._id)
    orders.push(order)
    await user.save()
    await products[random].save()
  }

  await status.save()


  await Order.insertMany(orders);

  console.log("[Database] Se corrió el seeder de Orders.");
};
