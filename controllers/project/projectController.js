const { default: slugify } = require("slugify");
const { Project } = require("../../models");
const { Product } = require("../../models");

// Display a listing of users
async function index(req, res) {
  const projects = await Project.find();
  res.json(projects);
}

// Display the specified resource.
async function show(req, res) {
  const projectSlug = req.params.slug;
  const project = await Project.findOne({ slug: projectSlug });
  res.json(project);
}

// Post Brand
async function create(req, res) {
}

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) {
  const projectId = req.params.id;
  const deletedProject = await Project.findById(projectId);
  await Project.findOneAndDelete({ id: projectId });
  res.json({
    message: `The Admin ${deletedProject.name} was deleted`,
  });
}

async function searchBrand(req, res) {
  const projectName = slugify(req.body.searchBrand).toLowerCase();
  const projects = await Project.find();
  const searchProject = projects.filter(
    (brand) => slugify(brand.slug).toLowerCase().includes(projectName) === true
  );

  res.json(searchProject);
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  searchBrand,
};
