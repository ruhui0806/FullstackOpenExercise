const router = require("express").Router();
const { Blog, User } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../utils/db");

router.get("/", async (req, res) => {
  const data = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", "*"), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [[sequelize.col("likes"), "DESC"]],
  });
  res.json(data);
});

module.exports = router;

//// The JSON returned by the route looks like the following:

// [
//     {
//       author: "Jami Kousa",
//       articles: "3",
//       likes: "10"
//     },
//     {
//       author: "Kalle Ilves",
//       articles: "1",
//       likes: "2"
//     },
//     {
//       author: "Dan Abramov",
//       articles: "1",
//       likes: "4"
//     }
//   ]
