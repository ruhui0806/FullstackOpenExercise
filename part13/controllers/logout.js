const { Session } = require("../models");
// const { userExtractor } = require("../utils/middleware");
const router = require("express").Router();

router.delete("/", async (req, res) => {
  const token = req.token;
  const tokenTobeDelete = await Session.destroy({ where: { token } });
  if (!tokenTobeDelete) {
    return res.status(404).json({ error: "Token not found" });
  }
  res.status(200).end();
});
module.exports = router;
