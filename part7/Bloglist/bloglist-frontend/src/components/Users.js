import { useState } from 'react'

const User = (itemUser) => {
    return (
        <div>
            <h3>Users</h3>
            <li key={itemUser.id}>{itemUser.name}</li>
        </div>
    )
}
