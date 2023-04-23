const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Create token
async function token(req, res) {
  try {
    let user
    if (req.body.username.includes("@")) {
      user = await User.findOne({ email: req.body.username }).populate({ path: "projects", populate: ["headings", "roles", "sub_categories", "categories", { path: "members", populate: ["role", "member"] }] }).populate("roles");

    } else {
      user = await User.findOne({ username: req.body.username }).populate({ path: "projects", populate: ["headings", "roles", "sub_categories", "categories", { path: "members", populate: ["role", "member"] }] }).populate("roles");
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (matchPassword) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
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
  const bodyData = req.body;
  console.log(bodyData)
  try {
    if (bodyData.googleId) {
      console.log("entro");
      const newUser = await User.create({
        firstname: bodyData.givenName,
        lastname: bodyData.familyName,
        email: bodyData.email,
      });
      const token = jwt.sign({ userId: newUser.id }, process.env.SESSION_SECRET);
      res.json({
        user: {
          id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          addresses: newUser.addresses,
          orders: newUser.orders,
          token: token,
        }
      })
    } else {
      console.log("no entro");
      const newUser = await User.create({
        firstname: bodyData.firstname,
        lastname: bodyData.lastname,
        password: await bcrypt.hash(`${bodyData.password}`, 8),
        email: bodyData.email,
        addresses: bodyData.addresses,
      });
      res.json(newUser);
    }
  } catch {
    console.log('error')
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
