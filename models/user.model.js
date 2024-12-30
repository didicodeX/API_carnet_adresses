const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().password) {
    this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 10);
  }
  next();
});


module.exports = mongoose.model("User", userSchema);
