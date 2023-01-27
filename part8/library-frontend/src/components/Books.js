import { ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
const Books = ({ show, setError }) => {
    const [authorToSearch, setAuthorToSearch] = useState('')
    const [genreToFilter, setGenreToFilter] = useState('')
    const [genres, setGenres] = useState([])
    const [books, setBooks] = useState([])
    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { authorToSearch, genreToFilter },
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        },
    })
    useEffect(() => {
        if (resultBooks.data) {
            setBooks(resultBooks.data.allBooks)
        }
        let genresList = []
        books.forEach((book) => {
            book.genres.forEach((genre) => {
                if (genresList.includes(genre) === false) {
                    genresList.push(genre)
                }
            })
        })
        console.log(genresList)
        setGenres(genresList)
        setGenreToFilter('')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books])

    if (resultBooks.loading) return 'Loadig books...'
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>
            <p>
                in genre <strong>{genreToFilter}</strong>{' '}
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {resultBooks.data.allBooks.map((b) => (
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {genres.map((genre) => (
                    <button key={genre} onClick={() => setGenreToFilter(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => setGenreToFilter('')}>clear</button>
            </div>
        </div>
    )
}

export default Books
