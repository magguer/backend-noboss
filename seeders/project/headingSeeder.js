const { faker } = require("@faker-js/faker");
const { Heading } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const headings = [];

    for (let i = 0; i <= Number(process.env.TOTAL_HEADING); i++) {
        const heading = new Heading({
        });
        headings.push(heading);
    }
    await Heading.insertMany(headings);
    console.log("[Database] Se corrió el seeder de Heading.");
};
