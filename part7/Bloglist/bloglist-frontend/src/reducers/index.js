import { blogReducer } from './blogReducer'
import { combinedReducer } from 'redux'
const combinedReducer = combinedReducers({
    blogReducer: blogReducer,
})
