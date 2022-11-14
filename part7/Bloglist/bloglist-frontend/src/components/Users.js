import { useState } from 'react'
import Table from 'react-bootstrap/Table'

const User = (props) => {
    return (
        <div>
            <p> {props.user.name} logged in</p>
            <button onClick={props.handleLogout}>log out</button>
            <h3>Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>usernames</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usersList.map((itemUser) => (
                        <tr key={itemUser.id}>
                            <td>{itemUser.name}</td>
                            <td>{itemUser.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
