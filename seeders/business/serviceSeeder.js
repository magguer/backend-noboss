const { faker } = require("@faker-js/faker");
const { Service } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const services = [];

    for (let i = 0; i <= Number(process.env.TOTAL_SERVICE); i++) {
        const service = new Service({
        });
        services.push(service);
    }
    await Service.insertMany(services);
    console.log("[Database] Se corrió el seeder de Service.");
};
