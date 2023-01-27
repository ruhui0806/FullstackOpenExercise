import { ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
const Books = ({ show, setError }) => {
    const [authorToSearch, setAuthorToSearch] = useState('')
    const [genreToSearch, setGenreToSearch] = useState('')
    // const [books, setBooks] = useState([])
    // const [authors, setAuthors] = useState([])
    // const [genres, setGenres] = useState([])
    const resultBooks = useQuery(ALL_BOOKS, {
        variables: { authorToSearch, genreToSearch },
        // refetchQueries: [{ query: ALL_BOOKS }],
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        },
    })
    // useEffect(() => {
    //     if (resultBooks.data) {
    //         setBooks(resultBooks.data.allBooks)
    //     }
    // }, [resultBooks.data])

    // const resultAllAuthors = useQuery(ALL_AUTHORS)
    // useEffect(() => {
    //     if (resultAllAuthors.data) {
    //         const allAuthors = resultAllAuthors.data.allAuthors
    //         setAuthors(allAuthors)
    //     }
    // }, [resultAllAuthors.data])

    if (resultBooks.loading) return 'Loadig books...'
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>
            {/* <div>
                <h2>Set filters to books</h2>
                <label>
                    Author{' '}
                    <select
                        value={authorToSearch}
                        onChange={({ target }) =>
                            setAuthorToSearch(target.value)
                        }
                    >
                        {authors.map((a) => (
                            <option key={a.name} value={a.name}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Genre{' '}
                    <select
                        value={genreToSearch}
                        onChange={({ target }) =>
                            setGenreToSearch(target.value)
                        }
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </label>
            </div> */}
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
        </div>
    )
}

export default Books
