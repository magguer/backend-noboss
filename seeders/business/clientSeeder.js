const { faker } = require("@faker-js/faker");
const { Client, Project } = require("../../models");
const defaultClients = require("../../db/clients")



faker.locale = "es";

module.exports = async () => {
    const clients = [];

    for (let clientData of defaultClients) {
        const project = await Project.findOne({ slug: clientData.project })

        const { name, type, email, phone, orders, orders_quantity, bookings, bookings_quantity } = clientData
        const client = new Client({
            name,
            type,
            email,
            phone,
            project,
            orders,
            orders_quantity,
            bookings,
            bookings_quantity
        });

        project.clients.push(client)
        await project.save()
        clients.push(client);
    }
    await Client.insertMany(clients);
    console.log("[Database] Se corrió el seeder de Client.");
};
