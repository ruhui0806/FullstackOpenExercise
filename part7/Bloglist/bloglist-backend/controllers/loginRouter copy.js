<<<<<<< HEAD
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")

loginRouter.post("/", async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null ?
        false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).send({ error: "invalid username or password" })
=======
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response
            .status(401)
            .send({ error: 'invalid username or password' })
>>>>>>> part7-redux-7.21
    }

    const userForToken = {
        username: user.username,
<<<<<<< HEAD
        id: user._id
    }
    // const token = jwt.sign(userForToken, process.env.SECRET)
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '10d' })
=======
        id: user._id,
    }
    // const token = jwt.sign(userForToken, process.env.SECRET)
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: '10d',
    })
>>>>>>> part7-redux-7.21

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})
<<<<<<< HEAD
module.exports = loginRouter
=======
module.exports = loginRouter
>>>>>>> part7-redux-7.21
