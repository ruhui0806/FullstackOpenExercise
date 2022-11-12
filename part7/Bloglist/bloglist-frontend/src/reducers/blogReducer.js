export const setBlogs = (data) => {
    return { type: 'SET_BLOGS', payload: data }
}

export const appendBlog = (data) => {
    return { type: 'ADD_BLOG', payload: data }
}

export const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.payload
        case 'ADD_BLOG':
            return state.concat(action.payload)
        default:
            return state
    }
}
