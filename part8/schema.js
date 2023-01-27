const { gql } = require('apollo-server')
const typeDefs = gql`
    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
        books: [Book!]!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type Query {
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        bookCount(author: String): Int!
        authorCount: Int!
        me: User
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            genres: [String!]!
            published: Int!
        ): Book!
        editAuthor(name: String!, born: Int!): Author
        addAuthor(name: String!, born: Int): Author
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
    type Subscription {
        bookAdded: Book!
    }
`
module.exports = typeDefs
