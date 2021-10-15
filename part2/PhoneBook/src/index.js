import ReactDOM from 'react-dom'
import App from './App.js'

import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)
promise.then(res => console.log(res))

ReactDOM.render(<App />, document.getElementById('root'))