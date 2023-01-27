import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import React, { useState, useEffect } from 'react'
const Recommend = ({ show, token }) => {
    const [authorToSearch, setAuthorToSearch] = useState('')
    const [genreToFilter, setGenreToFilter] = useState('')
    const [me, setMe] = useState(null)
    const [books, setBooks] = useState([])
    const currentUser = useQuery(ME)
    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { authorToSearch, genreToFilter },
        skip: !token,
    })

    useEffect(() => {
        if (currentUser.data && currentUser.data.me) {
            console.log('current user: ', currentUser.data)
            setMe(currentUser.data.me)
            setGenreToFilter(currentUser.data.me.favouriteGenre)
        }
    }, [currentUser.data, genreToFilter])
    useEffect(() => {
        if (resultBooks.data) {
            setBooks(resultBooks.data.allBooks)
            console.log('current user fav books: ', books)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books])

    if (currentUser.loading) return 'Loading current user...'
    if (resultBooks.loading) return 'Loading current user favouriteGenre...'
    if (!show) {
        return null
    }
    return (
        <div>
            <h2>books</h2>
            <p>
                books in your favorite genre <strong>{genreToFilter}</strong>{' '}
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((b) => (
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
