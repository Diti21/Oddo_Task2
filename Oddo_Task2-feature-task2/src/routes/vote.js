const router = require("express").Router();
const Answer = require("../models/answer");
const auth = require("../middleware/auth");

// Vote
router.post("/:ansId/vote", auth, async (req, res) => {
  const { dir } = req.body; // 1 or -1
  const ans = await Answer.findByIdAndUpdate(
    req.params.ansId,
    { $inc: { votes: dir } },
    { new: true }
  );
  res.json(ans);
});

module.exports = router;
