// const User = require("../models/User")
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response
            .status(401)
            .json({error: 'missing token or invalid token'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
    }
    // logger.error(error.message)
    next(error)
}
// https://github.com/auth0/express-jwt
// https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const bearerToken = authorization.substring(7)
        request.token = bearerToken
        return next()
    }
    request.token = undefined
    return next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        request.user = await User.findById(decodedToken.id)
    }
    return next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}
