const { faker } = require("@faker-js/faker");
const { RoleProject, Project, User } = require("../../models");
const defaultRolesProject = require("../../db/rolesProject")

faker.locale = "es";

module.exports = async () => {
    const roleProjects = [];
    /* 
        console.log(defaultRolesProject); */

    for (let rolesProjectData of defaultRolesProject) {
        const { name, slug, description, level } = rolesProjectData
        const project = await Project.findOne({ slug: rolesProjectData.project })
        const members = []

        for (let memberData of rolesProjectData.members) {
            const member = await User.findOne({ username: memberData })
            members.push(member)
        }

        const roleProject = new RoleProject({
            name,
            description,
            slug,
            level,
            project,
            members
        })

        for (let member of members) {
            member.roles.push(roleProject)
            member.projects.push(project)
            member.save()
            project.members.push({ role: roleProject, member })
        }

        roleProjects.push(roleProject)
        project.roles.push(roleProject)
        project.save()

    }

    await RoleProject.insertMany(roleProjects);
    console.log("[Database] Se corrió el seeder de Roles Project.");
};
