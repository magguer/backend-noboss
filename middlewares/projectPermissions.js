const { Project, User } = require("../models");
async function projectPermissions(req, res, next) {
    const projects = await Project.find({ id: req.auth.roles.project })
    return next();
}

module.exports = projectPermissions;