const { Client, Project } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.find({ slug: req.query.project });
    if (req.query.search) {
        const regex = new RegExp(req.query.search, "i");
        const clients = await Client.find({
            project,
            slug: { $regex: regex },
        }).sort({ createdAt: 'desc' }).lean();
        return res.json(clients);
    } else {
        const clients = await Client.find({ project }).sort({ createdAt: 'desc' }).lean();
        res.json(clients);
    }
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
    const project = await Project.findOne({ slug: req.body.project });
    const { name, email, phone, type } = req.body
    console.log(type);
    try {
        const client = new Client({
            name, email, phone, type, project, orders: []
        })
        await client.save()
        project.clients.push(client)
        project.save()
        res.json(client)
    } catch (error) {
        console.log(error);
        res.json("error")
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
