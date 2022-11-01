// const notesRouter = require('./controllers/blogRouter')
// const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')
// const mongoose = require('mongoose')



// // const url = process.env.MONGODB_URI == config.MONGODB_URI, which is defined in config.js
// logger.info('connecting to', config.MONGODB_URI)

// //app.js take over the responsibility to establish connection to the database from note.js
// mongoose.connect(config.MONGODB_URI)
// .then(() => {
//     console.log('connected to MongoDB')
// })
// .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
// })

// app.use(cors())
// app.use(express.static('build'))
// //add a json-parser function, help access the data in the app.post function. app.use()is a middleware function
// app.use(express.json())
// app.use(middleware.requestLogger)
// app.use('/api/notes', notesRouter)
// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)
const express = require('express')
const app = express()
// const Blog = require('./models/Blog') moved to blogRouter
const config = require('./utils/config')
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require("./controllers/userRouter")
const loginRouter = require('./controllers/loginRouter')
require('express-async-errors')
// const mongoUrl = 'mongodb://localhost/bloglist' defined it in config thus is replaced by config.MONGODB_URI
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('error connecting to MongoDB:', error.message()))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testingRouter')
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app