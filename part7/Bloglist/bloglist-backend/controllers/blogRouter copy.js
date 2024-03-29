//express object has a Router() method that creates a new router object, which you can add middleware and HTTP methods to it just as app:
const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
<<<<<<< HEAD
const User = require("../models/User")
const jwt = require("jsonwebtoken")
=======
const User = require('../models/User')
const jwt = require('jsonwebtoken')
>>>>>>> part7-redux-7.21
require('express-async-errors')

// blogRouter.get('/info', (request, response) => {
//     Blog
//     .find({})
//     .then(() => {
//       response.send('</h1>This is blogList backend</h1>')
//     })
//   })

// blogRouter.get('/', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })
////refactor to async-await:
blogRouter.get('/', async (request, response) => {
<<<<<<< HEAD
    const blogs = await Blog.find({}).populate("user", "username name")
=======
    const blogs = await Blog.find({})
        .populate('user', { username: 1 })
        .populate('comments')
    // const blogs = await Blog.find({}).populate('user', 'username name')
>>>>>>> part7-redux-7.21
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
<<<<<<< HEAD
    const blog = await Blog.findById(request.params.id)
=======
    const blog = await Blog.findById(request.params.id).populate('comments')
>>>>>>> part7-redux-7.21
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

// blogRouter.post('/', (request, response) => {
//     const blog = new Blog(request.body)

//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })
////refactor to async-await:

blogRouter.post('/', async (request, response) => {
<<<<<<< HEAD


    const body = request.body

    // const token = request.token
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!token || !decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }

    // else if (body.title === undefined || body.url === undefined) {
    //     return response.status(400).json({ error: 'content missing' })
    // }

    // const user = await User.findById(decodedToken.id)
=======
    const body = request.body

>>>>>>> part7-redux-7.21
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
<<<<<<< HEAD
        author: body.author === undefined ? "unknown" : body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
=======
        author: body.author === undefined ? 'unknown' : body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        comments: [],
>>>>>>> part7-redux-7.21
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
})

<<<<<<< HEAD
// blogRouter.delete("/:id", async (request, response) => {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).end()
// })

blogRouter.delete("/:id", async (request, response) => {
    // // const body = request.body
    console.log('bleep bloop');
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)


    const userOwner = await User.findById(decodedToken.id)

    // const userOwner = request.user

=======
blogRouter.delete('/:id', async (request, response) => {
    // // const body = request.body
    console.log('bleep bloop')
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    const userOwner = await User.findById(decodedToken.id)

>>>>>>> part7-redux-7.21
    const blog = await Blog.findById(request.params.id)

    if (userOwner._id.toString() === blog.user._id.toString()) {
        // await Blog.findByIdAndRemove(request.params.id)
        try {
            await Blog.deleteOne(blog)
            response.status(204).end()
        } catch (exception) {
            next(exception)
        }
<<<<<<< HEAD
    }
    // if (userOwner._id) {
    //     // await Blog.findByIdAndRemove(request.params.id)
    //     try {
    //         await Blog.deleteOne(blog)
    //         response.status(204).end()
    //     } catch (exception) {
    //         next(exception)
    //     }
    // }
    else {
        console.log('-->', userOwner._id.toString());
        console.log('-->', blog.user._id.toString());
        return response.status(401).json({ error: "unauthorized action:token missing or invalid" })
    }




})

blogRouter.put("/:id", async (request, response) => {
=======
    } else {
        console.log('-->', userOwner._id.toString())
        console.log('-->', blog.user._id.toString())
        return response
            .status(401)
            .json({ error: 'unauthorized action:token missing or invalid' })
    }
})

blogRouter.put('/:id', async (request, response) => {
>>>>>>> part7-redux-7.21
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
<<<<<<< HEAD
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})


module.exports = blogRouter


=======
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
    response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
>>>>>>> part7-redux-7.21
