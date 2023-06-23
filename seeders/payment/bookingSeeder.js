const { Booking, Project, Service } = require("../../models");
const defaultBookings = require("../../db/bookings")

module.exports = async () => {
    const bookings = [];

    for (let bookingData of defaultBookings) {
        const project = await Project.findOne({ slug: bookingData.project })
        const service = await Service.findOne({ slug: bookingData.service })
        const booking = new Booking({
            project,
            service,
            booking_date: bookingData.booking_date
        });
        bookings.push(booking);
    }
    await Booking.insertMany(bookings);
    console.log("[Database] Se corrió el seeder de Bookings.");
};
