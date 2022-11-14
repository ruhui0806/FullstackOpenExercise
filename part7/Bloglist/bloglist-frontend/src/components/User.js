import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const User = ({ user }) => {
    if (!user) {
        return null
    }
    return (
        <div>
            <h3> {user.name}</h3>
            <Table striped bordered hover>
                {/* {user.blogs.map((blog) => (
                <div key={blog.id}>
                    <li>{blog}</li>
                </div>
            ))} */}
                <thead>
                    <tr>
                        <th>added blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {user.blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>
                                {' '}
                                <Link>{blog.title}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
// const User = () => (
//     <div>
//         <h4>This is special route for User Route</h4>
//         <p>added blogs</p>
//     </div>
// )

export default User
