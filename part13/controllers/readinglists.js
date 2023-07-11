const router = require("express").Router();
const { ReadingLists } = require("../models");

router.post("/", async (req, res) => {
  const readinglistItem = await ReadingLists.create(req.body);
  res.json(readinglistItem);
});
module.exports = router;
