const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  role: { type: String, enum: ["guest","user","admin"], default: "user" },
});
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

