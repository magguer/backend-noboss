const { Booking, BookingStatus, Service, Client, Order, OrderStatus, Project } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const today = new Date().toLocaleDateString()
    const date = new Date(req.query.date).toLocaleDateString()
    const bookingsByDate = await Booking.find({ project: req.query.project, booking_date: req.query.date }).populate("service")
    res.json(bookingsByDate);
}

// Display the specified resource.
async function show(req, res) {
}

// Store a newly created resource in storage.
async function store(req, res) {
    const booking_date = new Date(req.query.date).toLocaleDateString()
    const project = await Project.findeById(req.query.project)
    const service = await Service.findeById(req.query.service)
    const client = await Client.findeById(req.query.client)
    const booking_status = await BookingStatus.findOne({ slug: "Pendiente" })
    const order_status = await OrderStatusStatus.findOne({ slug: "Procesando" })
    const order = new Order({ project, order_status, client, service })
    const booking = new Booking({ project, booking_status, booking_date, order, client, service }).populate("service")
    res.json(booking)
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
