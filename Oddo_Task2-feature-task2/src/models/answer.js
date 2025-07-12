const mongoose = require("mongoose");
const AnswerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  votes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.models.Answer || mongoose.model("Answer", AnswerSchema);

