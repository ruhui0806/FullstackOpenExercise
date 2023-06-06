const router = require("express").Router();
const { Blog, User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};
router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: { model: User, attributes: ["name", "username"] },
  });
  // console.log(JSON.stringify(blogs));
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
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
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
  const user = await User.findByPk(req.decodedToken.id);
  // console.log(user);
  // console.log(req.blog.userId);
  if (req.blog && user && req.blog.userId == user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    return res
      .status(404)
      .json({ error: "Only the user who created this blog can delete it" });
  }
});

module.exports = router;
