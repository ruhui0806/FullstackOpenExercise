import React from "react";

const Notification = ({message, errorOccured}) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10}

    const normalStyle = {
        color: 'green',
        fontStyle: 'italic',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10}
    
    if (message === null) {
        return null
    }
    if(errorOccured === false) {
        return (
            <div style={normalStyle}>
            {message}
            <br />
        </div>
        )
    }
    return (
        <div style={errorStyle}>
            {message}
            <br />
            <br />
        </div>
    )
}

export default Notification