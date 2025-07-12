const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
}, { timestamps: true });
module.exports = mongoose.models.Question || mongoose.model("Question", QuestionSchema);

