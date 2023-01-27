import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { updateCache } from './functions/updateCache'
const App = () => {
    const [token, setToken] = useState(null)
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()
    const notify = (error) => {
        if (!error) {
            return null
        }
        setErrorMessage(error)
        setTimeout(() => setErrorMessage(''), 10000)
    }
    const Notify = ({ errorMessage }) => {
        if (!errorMessage) {
            return null
        }
        return <div style={{ color: 'red' }}>{errorMessage}</div>
    }
    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('author')
    }
    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded
            notify(`${addedBook.title} added`)
            updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        },
    })

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
                {token ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={logout}>logout</button>
                    </>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} setError={notify} />
            <Books show={page === 'books'} setError={notify} />
            <NewBook show={page === 'add'} setError={notify} />
            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                setError={notify}
                setPage={setPage}
            />
            <Recommend show={page === 'recommend'} token={token} />
        </div>
    )
}

export default App
