const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, minlength: 3 },
    name: String,
    passwordHash: { type: String, minlength: 3 },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
        // delete returnedObject.blogs
    }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)
module.exports = User
