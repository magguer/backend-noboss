const { faker } = require("@faker-js/faker");
const { Address } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const addresses = [];

    for (let i = 0; i <= Number(process.env.TOTAL_ADDRESSES); i++) {
        const address = new Address({
        });
        addresses.push(address);
    }
    await Address.insertMany(addresses);
    console.log("[Database] Se corrió el seeder de Address.");
};
