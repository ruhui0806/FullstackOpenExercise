const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
<<<<<<< HEAD
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

blogSchema.pre('remove', function (next) {

  this.model('User').remove({ blogs: this._id }, next);
})


blogSchema.set('toJSON', {
  transform: (document, returnedOBJ) => {
    returnedOBJ.id = returnedOBJ._id.toString()
    delete returnedOBJ._id
    delete returnedOBJ.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
=======
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

blogSchema.pre('remove', function (next) {
    this.model('User').remove({ blogs: this._id }, next)
})

blogSchema.set('toJSON', {
    transform: (document, returnedOBJ) => {
        returnedOBJ.id = returnedOBJ._id.toString()
        delete returnedOBJ._id
        delete returnedOBJ.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema)
>>>>>>> part7-redux-7.21
