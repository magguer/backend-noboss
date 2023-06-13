const { Subcategory, Category, Project, Product } = require("../../models");
const { default: slugify } = require("slugify");
const { findOneAndDelete } = require("../../models/business/Category");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.find({ slug: req.query.project });
    const category = await Category.findById(req.query.category);
    console.log(req.query);
    const subcategories = await Subcategory.find({ project, category })
    res.json(subcategories);

}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
async function store(req, res) {
    const project = await Project.findById(req.body.project);
    const category = await Category.findById(req.body.category);
    const sub_category = new Subcategory({
        name: req.body.nameSubCategory,
        slug: slugify(req.body.nameSubCategory).toLowerCase(),
        project: project._id,
        category: category._id
    })
    await sub_category.save()
    project.sub_categories.push(sub_category._id)
    category.sub_categories.push(sub_category._id)
    await project.save()
    await category.save()
    res.json(sub_category)
}

// Update the specified resource in storage.
async function update(req, res) { }

// Remove the specified resource from storage.
async function destroy(req, res) {
    const project = await Project.findById(req.query.project)
    const category = await Category.findById(req.query.category)
    category.sub_categories.splice(category.sub_categories.indexOf(category), 1);
    project.sub_categories.splice(project.sub_categories.indexOf(project), 1);

    const sub_category = await Subcategory.findByIdAndDelete(req.params.id)
    const products = await Product.findOneAndDelete({ sub_category })

    await project.save()
    await category.save()

    res.json(category.sub_categories);
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
