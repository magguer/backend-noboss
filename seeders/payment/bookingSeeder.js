const { faker } = require("@faker-js/faker");
const { Booking } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const bookings = [];

    for (let i = 0; i <= Number(process.env.TOTAL_DISCOUNT_GROUP); i++) {
        const booking = new Booking({
        });
        discountGroups.push(discountGroup);
    }
    await DiscountGroup.insertMany(discountGroups);
    console.log("[Database] Se corrió el seeder de Bookings.");
};
