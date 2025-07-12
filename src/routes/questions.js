const router = require("express").Router();
const Question = require("../models/Question");
const auth = require("../middleware/auth");

// List
router.get("/", async (req, res) => {
  const list = await Question.find().sort({ createdAt: -1 });
  res.json(list);
});

// Get one w/ answers populated
router.get("/:id", async (req, res) => {
  const q = await Question.findById(req.params.id)
    .populate({ path: "answers", populate: "author" });
  res.json(q);
});

// Create
router.post("/", auth, async (req, res) => {
  const q = await Question.create({
    ...req.body,
    author: req.user.id
  });
  res.json(q);
});

module.exports = router;
