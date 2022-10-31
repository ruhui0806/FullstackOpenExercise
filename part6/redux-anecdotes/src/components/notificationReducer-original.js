export const setNotification = (message) => {
    return {
        type: "SET_MESSAGE",
        data: {
           message
        }
    }
}
export const removeNotification = () => {
    return {
        type: "REMOVE_MESSAGE"
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_MESSAGE": 
        // const message = `you voted "${action.data.message}"`
            return action.data.message
        case "REMOVE_MESSAGE":
            return null
        default: 
            return state
    }
}

export default notificationReducer