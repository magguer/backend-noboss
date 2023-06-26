const { Application, Project, User, RoleProject } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const applications = await Application.find({ project: req.query.project }).populate("user");
    res.json(applications);
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
    const project = await Project.findById(req.params.id)
    if (req.body.pre_status) {
        const application = await Application.findOneAndRemove({ project, user: req.body.user })
        await Project.findByIdAndUpdate(req.params.id,
            {
                $pull: { applications: application._id }
            })
        res.status(200)
    } else {
        const application = new Application({ project, user: req.auth.id, status: false })
        await application.save()
        await Project.findByIdAndUpdate(req.params.id,
            {
                $push: { applications: application._id }
            })
        res.status(200)
    }
}

// Update the specified resource in storage.
async function update(req, res) {
    const application = await Application.findByIdAndRemove(req.params.id)
    const project = await Project.findByIdAndUpdate(application.project, {
        $pull: { applications: application._id }
    })
    const user = await User.findById(application.user)
    const role = await RoleProject.findOne({ project: application.project, slug: "miembro" })

    project.members.push({ role, member: user })
    user.roles.push(role)
    user.projects.push(project)
    role.members.push(user)

    await project.save()
    await user.save()
    await role.save()

    return res.status(200).json("OK")
}

// Remove the specified resource from storage.
async function destroy(req, res) { }

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
