import { gql } from '@apollo/client'

const ALL_BOOKS = gql`
    query allBooks($authorToSearch: String, $genreToFilter: String) {
        allBooks(author: $authorToSearch, genre: $genreToFilter) {
            id
            title
            genres
            published
            author {
                name
                bookCount
                born
            }
        }
    }
`

const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            born
            name
            bookCount
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook(
        $title: String!
        $author: String!
        $genres: [String!]!
        $published: Int!
    ) {
        addBook(
            title: $title
            author: $author
            genres: $genres
            published: $published
        ) {
            title
            published
            author {
                id
                born
                name
                bookCount
            }
            genres
            id
        }
    }
`

const EDIT_AUTHOR = gql`
    mutation editAuthor($born: Int!, $name: String!) {
        editAuthor(born: $born, name: $name) {
            id
            born
            name
            bookCount
        }
    }
`
const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
const ME = gql`
    query {
        me {
            username
            favouriteGenre
            id
        }
    }
`

const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            id
            title
            genres
            published
            author {
                name
                bookCount
                born
            }
        }
    }
`
export { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK, EDIT_AUTHOR, LOGIN, ME, BOOK_ADDED }
