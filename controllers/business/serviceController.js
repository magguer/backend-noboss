const { Service, Project } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.findById(req.query.project);
    if (req.query.search) {
        const regex = new RegExp(req.query.search, "i");
        const services = await Service.find({
            project,
            slug: { $regex: regex },
        })
            .populate("sub_category")
            .populate("category")
            .sort({ createdAt: 'desc' })
            .lean();
        return res.json(services);
    } else {
        const services = await Service.find({ project })
            .populate("sub_category")
            .populate("category")
            .sort({ createdAt: 'desc' })
            .lean();
        res.json(services);
    }
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) { }

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
