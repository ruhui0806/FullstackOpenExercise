const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  let where = {};
  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.substring]: req.query.search } },
        { author: { [Op.substring]: req.query.search } },
      ],
    };
  }
  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"],
    },
    where,
    // where: {
    //   [Op.or]: [
    //     { title: { [Op.substring]: req.query.search } },
    //     { author: { [Op.substring]: req.query.search } },
    //   ],
    // },
  });
  res.json(blogs);
});
router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    // const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: req.user.id });
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  // const user = await User.findByPk(req.decodedToken.id);
  if (req.blog && req.blog.userId == req.user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    return res
      .status(404)
      .json({ error: "Only the user who created this blog can delete it" });
  }
});

module.exports = router;
