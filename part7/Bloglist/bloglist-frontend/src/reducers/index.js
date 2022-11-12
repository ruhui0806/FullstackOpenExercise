import { blogReducer } from './blogReducer'
import { combineReducers } from 'redux'
import { notificationReducer } from './notificationReducer'

export const combinedReducer = combineReducers({
    blogs: blogReducer,
    message: notificationReducer,
})

// export const rootStore = createStore(
//     combinedReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
