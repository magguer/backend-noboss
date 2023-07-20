const { Service, Project } = require("../../models");

// Display a listing of the resource.
async function index(req, res) {
    const project = await Project.findById(req.query.project);
    if (req.query.search) {
        const regex = new RegExp(req.query.search, "i");
        const services = await Service.find({
            project,
            slug: { $regex: regex },
        })
            .populate("sub_category")
            .populate("category")
            .sort({ createdAt: 'desc' })
            .lean();
        return res.json(services);
    } else {
        const services = await Service.find({ project })
            .populate("sub_category")
            .populate("category")
            .sort({ createdAt: 'desc' })
            .limit(req.query.best ? 5 : null)
            .lean();
        res.json(services);
    }
}

// Display the specified resource.
async function show(req, res) { }

// Store a newly created resource in storage.
// Show the form for creating a new resource
async function store(req, res) {
    const form = formidable({
        keepExtensions: true,
        multiples: true,
    });
    try {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log("Error parsing the files");
                return res.status(400).json({
                    status: "Fail",
                    message: "There was an error parsing the files",
                    error: err,
                });
            }
            if (files.images) {
                let arrImages = [];
                if (files.images.length > 0) {
                    for (let image of files.images) {
                        const ext = path.extname(image.filepath);
                        const newFileName = `image_${Date.now()}${ext}`;
                        const { data, error } = await supabase.storage
                            .from(`imgs/projects/${fields.project}/services`)
                            .upload(newFileName, fs.createReadStream(image.filepath), {
                                cacheControl: "3600",
                                upsert: false,
                                contentType: image.mimetype,
                                duplex: "half",
                            });
                        arrImages.push(newFileName);
                    }
                } else {
                    const ext = path.extname(files.images.filepath);
                    const newFileName = `image_${Date.now()}${ext}`;
                    const { data, error } = await supabase.storage
                        .from(`imgs/projects/${fields.project}/services`)
                        .upload(newFileName, fs.createReadStream(files.images.filepath), {
                            cacheControl: "3600",
                            upsert: false,
                            contentType: files.images.mimetype,
                            duplex: "half",
                        });
                    arrImages.push(newFileName);
                }

                const category = await Category.findById(fields.category);

                const sub_category = await Subcategory.findById(fields.sub_category);

                const project = await Project.findById(fields.project);

                const service = new Service({
                    model: fields.model,
                    slug: slugify(fields.model).toLowerCase(),
                    sku: fields.sku,
                    description: fields.description,
                    images_url: arrImages,
                    details: fields.details,
                    category: category._id,
                    sub_category: sub_category._id,
                    project: project._id,
                    sales_quantity: 0,
                    price: fields.price,
                    cost: fields.cost,
                    stock: fields.stock,
                });
                await service.save();

                sub_category.services.push(service._id);
                project.services.push(service._id);
                await sub_category.save();
                await project.save();

                const newService = await Service.findById(service.id)
                    .populate("sub_category")
                    .populate("category");

                return res.json(newService);
            }
        });
    } catch (error) {
        res.json(error);
    }
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
