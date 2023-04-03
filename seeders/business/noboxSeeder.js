const { faker } = require("@faker-js/faker");
const { Nobox } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const noboxes = [];

    for (let i = 0; i <= Number(process.env.TOTAL_NOBOX); i++) {
        const nobox = new Nobox({
        });
        noboxes.push(nobox);
    }
    await Nobox.insertMany(noboxes);
    console.log("[Database] Se corrió el seeder de Nobox.");
};
