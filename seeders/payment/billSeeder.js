const { faker } = require("@faker-js/faker");
const { Bill } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const bills = [];

    for (let i = 0; i <= Number(process.env.TOTAL_BILL); i++) {
        const bill = new Bill({
        });
        bills.push(bill);
    }
    await Bill.insertMany(bills);
    console.log("[Database] Se corrió el seeder de Bills.");
};
