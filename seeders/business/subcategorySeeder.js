const { faker } = require("@faker-js/faker");
const { Subcategory } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const subcategories = [];

    for (let i = 0; i <= Number(process.env.TOTAL_SUBCATEGORY); i++) {
        const subcategory = new Subcategory({
        });
        subcategories.push(subcategory);
    }
    await Subcategory.insertMany(subcategories);
    console.log("[Database] Se corrió el seeder de Subcategory.");
};
