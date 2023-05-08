const { User } = require("../../models");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


// Create token
async function token(req, res) {
  try {
    let user
    if (req.body.username.includes("@")) {
      user = await User.findOne({ email: req.body.username }).populate({ path: "projects", populate: ["headings", "roles", "sub_categories", "categories", "movements", { path: "members", populate: ["role", "member"] }] }).populate("roles");

    } else {
      user = await User.findOne({ username: req.body.username }).populate({ path: "projects", populate: ["headings", "roles", "sub_categories", "categories", "movements", { path: "members", populate: ["role", "member"] }] }).populate("roles");

    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (matchPassword) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({
        id: user._id,
        email: user.email,
        username: user.username,
        image_url: user.image_url,
        firstname: user.firstname,
        lastname: user.lastname,
        projects: user.projects,
        roles: user.roles,
        token: token,
      });
    } else res.json("No existe este usuario");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User login failed",
      error: err.message,
    });
  }
}

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find();
  res.json(users);
}

// Display the specified resource.
async function show(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId).populate("orders");
  res.json(user);
}

// Creating a new resource  from storage.
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
      if (files.image_url) {
        const ext = path.extname(files.image_url.filepath);
        const newFileName = `image_${Date.now()}${ext}`;
        const { data, error } = await supabase.storage
          .from("imgs/users/avatars")
          .upload(newFileName, fs.createReadStream(files.image_url.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.image_url.mimetype,
            duplex: "half",
          });
        const user = new User({
          firstname: fields.firstname,
          lastname: fields.lastname,
          image_url: newFileName,
          username: fields.username,
          email: fields.email,
          password: fields.password,
          banned: false
        });
        await user.save();
        const newUser = await User.findById(user.id)
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
        return res.json({
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          image_url: newUser.image_url,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          projects: newUser.projects,
          roles: newUser.roles,
          token: token,

        });
      }
    });
  } catch (error) {
    res.json(error);
  }
}

// Editing the specified resource  from storage.
async function update(req, res) {
  const bodyData = req.body;
  const userId = req.params.id;
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    {
      firstname: bodyData.firstname,
      lastname: bodyData.lastname,
      password: await bcrypt.hash(`${bodyData.password}`, 8),
      email: bodyData.email,
      addresses: bodyData.addresses,
    },
    { returnOriginal: false }
  );
  res.json(user);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  res.json({ message: "The User was deleted", userDeleted: user });
}

module.exports = {
  token,
  index,
  show,
  store,
  update,
  destroy,
};
