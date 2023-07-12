const router = require("express").Router();
const { ReadingLists } = require("../models");

router.post("/", async (req, res) => {
  const readinglistItem = await ReadingLists.create(req.body);
  res.json(readinglistItem);
});

router.put("/:id", async (req, res) => {
  const readinglistItem = await ReadingLists.findByPk(req.params.id);
  if (readinglistItem.userId !== req.decodedToken.id) {
    throw new Error(
      "User can only mark the blogs in their own reading list as read."
    );
  }
  readinglistItem.read = req.body.read;
  await readinglistItem.save();
  res.json(readinglistItem);
});
module.exports = router;
