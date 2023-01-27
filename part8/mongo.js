require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(url)
        console.log('connected to MongoDB successfully')
    } catch (error) {
        console.log('eeror connection to MongoDB:', error.message)
    }
}
module.exports = connectDB
