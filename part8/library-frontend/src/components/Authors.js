import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
const Authors = (props) => {
    const [born, setBorn] = useState('')
    const [value, setValue] = useState('')
    const resultAllthors = useQuery(ALL_AUTHORS)
    const [updateBorn] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)
        },
    })

    if (resultAllthors.loading) {
        return <div>Loading authors...</div>
    }
    if (!props.show) {
        return null
    }
    const submit = async (event) => {
        event.preventDefault()
        updateBorn({ variables: { name: value, born } })
        setValue('')
        setBorn('')
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {resultAllthors.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {props.token && ( */}
            <div>
                <h2>Set birthyear</h2>
                <form onSubmit={submit}>
                    <label>
                        name{' '}
                        <select
                            value={value}
                            onChange={({ target }) => setValue(target.value)}
                        >
                            {resultAllthors.data.allAuthors.map((a) => (
                                <option key={a.name} value={a.name}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div>
                        born{' '}
                        <input
                            type="number"
                            value={born}
                            onChange={({ target }) =>
                                setBorn(parseInt(target.value))
                            }
                        />
                    </div>
                    <button type="submit">update author</button>
                </form>
            </div>
            {/* )} */}
        </div>
    )
}

export default Authors
