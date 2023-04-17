const { faker } = require("@faker-js/faker");
const { Address } = require("../../models");

faker.locale = "es";

module.exports = async () => {
    const defAddress = {
        country: "Uruguay",
        city: "Canelones",
        zone: "El Pinar",
        zip: 0,
        street_1: "Colombia",
        street_2: "EEUU",
        numberDoor: "M313 S25",
        extra: "Portón verde."
    };
    await Address.create(defAddress);
    console.log("[Database] Se corrió el seeder de Address.");
};
