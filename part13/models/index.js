const User = require("./user");
const Blog = require("./blog");
const ReadingLists = require("./reading_lists");

Blog.belongsTo(User);
User.hasMany(Blog);

Blog.belongsToMany(User, { through: ReadingLists, as: "users_marked" });
User.belongsToMany(Blog, { through: ReadingLists, as: "readings" });

//instead of using sync to update changes in database, we use migration to manage changes in source code to databases
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
  ReadingLists,
};
