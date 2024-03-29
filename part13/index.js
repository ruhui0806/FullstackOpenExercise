const express = require("express");
require("express-async-errors");
const app = express();

const { connectToDatabase } = require("./utils/db");
const { PORT } = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readinglists");
const middleware = require("./utils/middleware");
app.use(express.json());

app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use("/api/authors", authorsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.userExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/logout", logoutRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHander);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
start();
