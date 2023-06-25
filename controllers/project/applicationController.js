const { Application } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const applications = await Application.find({ project: req.query.project }).populate("user");
    res.json(applications);
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {

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
