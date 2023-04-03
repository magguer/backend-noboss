const { Schema, mongoose } = require("../../db");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Inserte un username"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Inserte un email."],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Inserte su nombre"],
    },
    lastname: {
      type: String,
      required: [true, "Inserte su apellido"]
    },
    photo_url: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Inserte un password."],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

adminSchema.methods.toJSON = function () {
  const admin = this.toObject();
  admin.id = admin._id.toString();
  delete admin.password;
  return admin;
};

///////Dejar comentado el Bcrypt, porque estaba generando problemas con el Login de los Admin

// Bcrypt - Password;
// adminSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     this.password = await bcrypt.hash(this.password, 8);
//     next();
//   }
// });

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
