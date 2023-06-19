const User = require("./user");
const Blog = require("./blog");

User.hasMany(Blog);
Blog.belongsTo(User);
//instead of using sync to update changes in database, we use migration to manage changes in source code to databases
// Blog.sync({ alter: true });
// User.sync({ alter: true });

module.exports = {
  Blog,
  User,
};
