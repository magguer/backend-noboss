const { format, startOfToday } = require("date-fns");
const { Booking } = require("../../models");
const { es } = require("date-fns/locale");

// Display a listing of the resource.
async function index(req, res) {
    const bookingsByDate = await Booking.find({ project: req.query.project, booking_date: req.query.date }).populate("service")
    res.json(bookingsByDate);
}

// Display the specified resource.
async function show(req, res) {
}

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
