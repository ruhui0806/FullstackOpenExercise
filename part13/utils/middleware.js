const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { User, Session } = require("../models");
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHander = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);

    const tokenInSession = await Session.findOne({ where: { token } });
    if (!tokenInSession) {
      throw new Error("Token missing or invalid");
    }

    request.token = token;
    request.decodedToken = jwt.verify(token, SECRET);
  }
  return next();
};

const userExtractor = async (request, response, next) => {
  request.user = await User.findByPk(request.decodedToken.id);
  if (request.user.disabled) {
    throw new Error("This user account is disabled");
  }
  return next();
};

module.exports = {
  unknownEndpoint,
  errorHander,
  tokenExtractor,
  userExtractor,
};
