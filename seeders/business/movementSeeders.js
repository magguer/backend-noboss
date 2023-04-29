const { faker } = require("@faker-js/faker");
const { Movement } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const movements = [];

    for (let i = 0; i <= Number(process.env.TOTAL_NOBOX); i++) {
        const nobox = new Nobox({
        });
        movements.push(nobox);
    }
    await Movement.insertMany(movements);
    console.log("[Database] Se corrió el seeder de Movimientos.");
};
