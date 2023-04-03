const { faker } = require("@faker-js/faker");
const { Client } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const clients = [];

    for (let i = 0; i <= Number(process.env.TOTAL_CLIENTS); i++) {
        const client = new Client({
        });
        clients.push(client);
    }
    await Client.insertMany(clients);
    console.log("[Database] Se corrió el seeder de Client.");
};
