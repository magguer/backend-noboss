const { Category, Project } = require("../../models");
const { default: slugify } = require("slugify");

// Display a listing of the resource.
async function index(req, res) {
  const project = await Project.findById(req.query.project);
  const categories = await Category.find({ project }).populate("sub_categories")
  res.json(categories);
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
  const project = await Project.findById(req.body.project);
  const category = new Category({
    name: req.body.nameCategory,
    slug: slugify(req.body.nameCategory).toLowerCase(),
    project: project._id
  })
  await category.save()
  project.categories.push(category._id)
  await project.save()
  res.json(category)
}

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) { }

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
