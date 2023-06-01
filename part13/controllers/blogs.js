const router = require("express").Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs));
    res.json(blogs);
  } catch (error) {
    return res.status(400).json({ error });
  }
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
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    return res.status(404).json({ error });
  }
});

module.exports = router;
