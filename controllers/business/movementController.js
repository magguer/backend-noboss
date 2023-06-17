const { Movement, Project, User, Client, Order, Product } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.findById(req.query.project)
    const movements = await Movement.find({ project }).populate("user").populate("project").sort({ createdAt: 'desc' })

    res.json(movements)
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
    const { amount, reason, type } = req.body
    const project = await Project.findById(req.body.project)
    const user = await User.findById(req.auth.id)
    const client = await Client.findById(req.body.client)


    const movement = new Movement({
        amount, reason, type, user: user._id, project: project._id, client: client?._id
    })
    await movement.save()

    user.movements.push(movement)
    project.movements.push(movement)

    if (type === "spent") {
        project.spent_money += +amount
    }
    if (type === "sale") {
        const { cart } = req.body
        const order = new Order({
            project, client
        })
        for (productData of cart) {
            const product = await Product.findById(productData.product._id)
            product.orders.push(order)
            /* order.total_price += productData.fixed_price */
            product.sales_quantity += +productData.quantity
            product.stock -= productData.quantity
            order.products.push(product)
            await product.save()
        }
        order.details = cart
        project.sales_money += +amount
        client.orders_quantity = client.orders_quantity + 1
        client.orders.push(order)
        await order.save()
        await client.save()
    }

    await user.save()
    await project.save()

    const newMov = await Movement.findById(movement.id).populate("user")

    res.json(newMov)

}

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) { }

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
