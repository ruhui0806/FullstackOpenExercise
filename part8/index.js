require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const Book = require('./models/BookSchema')
const connectDB = require('./mongo.js')
const Author = require('./models/AuthorSchema')
const User = require('./models/UserSchema')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const JWT_SECRET = process.env.JWT_SECRET
connectDB()

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/graphql',
    })
    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer)
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                // console.log('authorization', auth)
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                // console.log(currentUser)
                return { currentUser }
            }
        },
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })
    await server.start()
    //code in the below line is the code for apollo server 4, but here we use apollo server 3,
    //// app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server))

    //reference: https://www.apollographql.com/docs/apollo-server/v3/integrations/middleware/
    server.applyMiddleware({
        app,
        path: '/graphql',
    })
    const PORT = 4000
    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    })
}
// call the function that does the setup and starts the server
start()
