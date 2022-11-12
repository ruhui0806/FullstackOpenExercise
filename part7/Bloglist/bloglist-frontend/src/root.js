import { createStore } from 'redux'
import { combinedReducer } from './reducers'

export const rootStore = createStore(
    combinedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
