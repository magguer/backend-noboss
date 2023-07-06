const { Client, Project } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
  const project = await Project.findById(req.query.project);
  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    const clients = await Client.find({
      project,
      name: { $regex: regex },
    })
      .sort({ createdAt: "desc" })
      .skip(req.query.offset)
      .limit(20)
      .lean();
    return res.json(clients).status(200);
  } else {
    const clients = await Client.find({ project })
      .sort(
        req.query.best ? { orders_quantity: "desc" } : { createdAt: "desc" }
      )
      .skip(req.query.offset)
      .limit(req.query.best ? 5 : 20)
      .lean();
    return res.json(clients).status(200);
  }
}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  const project = await Project.findOne({ slug: req.body.project });
  const { name, email, phone, type } = req.body;
  try {
    const client = new Client({
      name,
      email,
      phone,
      type,
      project,
      orders: [],
      orders_quantity: 0,
      bookings: [],
      bookings_quantity: 0,
    });
    await client.save();
    project.clients.push(client);
    project.save();
    res.json(client);
  } catch (error) {
    console.log(error);
    res.json("error");
  }
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
