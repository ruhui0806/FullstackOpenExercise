export const blogReducer = (state = false, action) => {
    switch (action.type) {
        case 'SHOW_MORE':
            return true
        case 'HIDE':
            return false
        default:
            return state
    }
}
