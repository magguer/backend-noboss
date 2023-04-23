const { faker } = require("@faker-js/faker");
const { Heading } = require("../../models");
const defaultHeadings = require("../../db/headings");

faker.locale = "es";

module.exports = async () => {
    const headings = []

    for (let headingData of defaultHeadings) {
        const { name, slug, icon_url, projects } = headingData
        const heading = new Heading({
            name,
            slug,
            icon_url,
            projects
        });
        headings.push(heading);
    }
    await Heading.insertMany(headings);
    console.log("[Database] Se corrió el seeder de Headings.");
};
