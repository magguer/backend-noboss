const { Movement, Project, User, Client } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.findOne({ slug: req.query.project })
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

    try {
        const movement = new Movement({
            amount, reason, type, user: user._id, project: project._id, client: client?._id
        })
        await movement.save()

        user.movements.push(movement)
        project.movements.push(movement)

        if (type === "spent") {
            project.spent_money += +amount
        }

        await user.save()
        await project.save()

        const newMov = await Movement.findById(movement.id).populate("user")

        res.json(newMov)
    } catch (error) {
        res.json(error)
    }
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
