const router = require("express").Router();
const Answer = require("../models/answer");
const Question = require("../models/question");
const auth = require("../middleware/auth");

// Post answer
router.post("/:questionId/answers", auth, async (req, res) => {
  const ans = await Answer.create({
    question: req.params.questionId,
    body: req.body.body,
    author: req.user.id
  });
  await Question.findByIdAndUpdate(req.params.questionId, {
    $push: { answers: ans._id }
  });
  res.json(ans);
});

module.exports = router;
