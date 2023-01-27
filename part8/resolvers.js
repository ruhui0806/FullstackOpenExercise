const Book = require('./models/BookSchema')
const Author = require('./models/AuthorSchema')
const User = require('./models/UserSchema')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const { UserInputError, AuthenticationError } = require('apollo-server')

const pubsub = new PubSub()
const JWT_SECRET = 'THIS_IS_A_SECRET_KEY'
const resolvers = {
    Book: {
        id: (root) => root.id,
        title: (root) => root.title,
        published: (root) => root.published,
        author: async (root) => {
            return Author.findById(root.author)
        },
        genres: (root, args) => root.genres,
    },
    Author: {
        // born: (root) => root.born,
        // name: (root) => root.name,
        // id: (root) => root.id,
        books: async (root) => await Book.find({ author: root.id }),
        bookCount: async (root) =>
            await Book.find({ author: root.id }).countDocuments(),
        // bookCount: async (root) => {
        //     const matchedAuthor = await Author.findOne({ name: root.name })
        //     console.log('Book.find')
        //     return Book.find({ author: matchedAuthor }).count()
        // },
    },
    Query: {
        allBooks: async (root, args) => {
            if (!args.genre && !args.author) {
                return Book.find({})
            }
            const matchedAuthor = await Author.findOne({
                name: args.author,
            })
            if (!matchedAuthor) {
                return Book.find({
                    genres: { $in: [args.genre] },
                })
            }
            //args.author is string type(by name)
            if (!args.genre) {
                return Book.find({
                    author: matchedAuthor,
                })
            }
            return Book.find({
                author: matchedAuthor,
                genres: { $in: [args.genre] },
            })
        },
        allAuthors: async (root, args) => {
            console.log('Author.find')
            return Author.find({}).populate('books')
        },

        bookCount: async (root, args) => {
            if (!args.author) {
                return Book.collection.countDocuments()
            }
            const matchedAuthor = await Author.findOne({ name: args.author })
            return Book.find({ author: matchedAuthor }).count()
        },
        authorCount: async (root, args) => {
            return Author.collection.countDocuments()
        },
        // me: User
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const filter = { name: args.name }
            const update = { born: args.born }
            const author = await Author.findOneAndUpdate(filter, update, {
                new: true,
            })
            return author
        },
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            const currentAuthor = await Author.findOne({ name: args.author })
            if (!currentAuthor) {
                const author = new Author({ name: args.author })
                await author.save()
                currentAuthor = author
            }
            const book = new Book({
                title: args.title,
                published: args.published,
                author: currentAuthor.id,
                genres: args.genres,
            })
            try {
                await book.save()
                // const bookCount = await Book.find({
                //     author: currentAuthor.id,
                // }).countDocuments()
                // await Author.findOneAndUpdate({
                //     name: currentAuthor.name,
                //     bookCount: bookCount,
                // })
                // book = await book.populate('author').execPopulate()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            //sends a notification to subscribers:
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },
        addAuthor: async (root, args) => {
            const author = new Author({ ...args })
            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return author
        },
        // createUser(username: String!, favouriteGenre: String!): User
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            })
            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
        },
        // login(username: String!, password: String!): Token
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            console.log('logged in user:', user)
            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }
            const userForToken = {
                //username: user.username
                username: args.username,
                id: user._id,
            }
            //return Token:
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            // More on pubsub below
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
        },
    },
}
module.exports = resolvers
