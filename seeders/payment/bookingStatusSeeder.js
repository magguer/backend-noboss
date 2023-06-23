const { BookingStatus } = require("../../models");
const defaultBookingStatus = require("../../db/bookingStatus")

module.exports = async () => {
  const AllBookingStatus = [];

  for (let statusBookingData of defaultBookingStatus) {
    const bookingStatus = new BookingStatus(statusBookingData);
    AllBookingStatus.push(bookingStatus);
  }

  await BookingStatus.insertMany(AllBookingStatus);

  console.log("[Database] Se corrió el seeder de Booking Status.");
}
