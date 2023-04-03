const { faker } = require("@faker-js/faker");
const { DiscountGroup } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const discountGroups = [];

    for (let i = 0; i <= Number(process.env.TOTAL_DISCOUNT_GROUP); i++) {
        const discountGroup = new DiscountGroup({
        });
        discountGroups.push(discountGroup);
    }
    await DiscountGroup.insertMany(discountGroups);
    console.log("[Database] Se corrió el seeder de Discount Groups.");
};
