const { Schema, mongoose } = require("../../db");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Inserte un username."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Inserte un email."],
      unique: true,
    },
    phone: {
      type: String,
    },
    firstname: {
      type: String,
      required: [true, "Inserte su nombre."],
    },
    lastname: {
      type: String,
      required: [true, "Inserte su apellido."],
    },
    photo_url: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Inserte una password."],
    },
    addresses: [{
      type: Schema.Types.ObjectId,
      ref: "address",
    }],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: "project",
    }],
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

// Bcrypt - Password
// userSchema.pre('save', async function (next) {
//     if (this.isModified("password") || this.isNew) {
//         this.password = await bcrypt.hash(this.password, 8)
//         next();
//     }
// })

const User = mongoose.model("User", userSchema);
module.exports = User;
