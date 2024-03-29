const router = require("express").Router();
const { Op } = require("sequelize");

const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: ["userId"] } },
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === "true";
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      through: {
        attributes: ["id", "read"],
        where,
      },
    },
  });
  if (user) {
    res.json(user);
  } else {
    // res.status(404).end();
    return res.status(400).json({ error: error.message });
  }
});
// router.get("/:username", async (req, res) => {
//   const user = await User.findOne({ where: { username: req.params.username } });
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).end();
//   }
// });
router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.username;
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});
module.exports = router;
