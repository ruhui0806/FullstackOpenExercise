import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import {
    initializeBlogs,
    setBlogs,
    removeBlog,
    moreLike,
    addNew,
} from './reducers/blogReducer'
import { setUser, logOut, loggedUser, loginUser } from './reducers/loginReducer'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import { setUsers, initializeUsers } from './reducers/usersReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginVisible, setLoginVisible] = useState(false)
    const [blogVisible, setBlogVisible] = useState(false)

    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const message = useSelector((state) => state.message)
    const user = useSelector((state) => state.login)
    const usersList = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(loggedUser())
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            dispatch(loginUser({ username, password }))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setMessage('Wrong username or password'))
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
    }

    const handleLogout = () => {
        dispatch(logOut())
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const addBlog = (blogObject) => {
        dispatch(addNew(blogObject))
    }

    const addBlogNotification = (blogObject) => {
        dispatch(
            setMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
        )
        setTimeout(() => {
            dispatch(setMessage(null))
        }, 5000)
    }

    const updateLikes = (id) => {
        dispatch(moreLike(id))
    }

    const removeBlogof = (id) => {
        const blog = blogs.find((blog) => blog.id === id)
        if (window.confirm(`Delete ${blog.title} ?`)) {
            dispatch(removeBlog(id)).then(
                dispatch(
                    setMessage(`Remove blog ${blog.title} by ${blog.author}`)
                )
            )
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000)
        }
    }

    const SortBlogbyLikes = (a, b) => {
        return b.likes - a.likes
    }
    const LoginForms = () => (
        <>
            <h2>log in to application</h2>
            <div style={{ display: loginVisible ? 'none' : '' }}>
                <button
                    id="click-to-login"
                    onClick={() => setLoginVisible(true)}
                >
                    Click to login
                </button>
            </div>
            <Notification
                message={message}
                style={{
                    color: 'red',
                    borderStyle: 'solid',
                    borderColor: 'red',
                    background: 'lightgray',
                    fontSize: 20,
                }}
            />
            <div style={{ display: loginVisible ? '' : 'none' }}>
                <LoginForm
                    onSubmit={handleLogin}
                    username={username}
                    password={password}
                    handleUsernameChange={(event) =>
                        setUsername(event.target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </>
    )
    const BlogsList = () => (
        <>
            <Notification
                message={message}
                style={{
                    color: 'green',
                    borderStyle: 'solid',
                    borderColor: 'green',
                    background: 'lightgray',
                    fontSize: 20,
                }}
            />
            <p> {user.name} logged in</p>
            <button onClick={handleLogout}>log out</button>
            <br />
            <div style={{ display: blogVisible ? 'none' : '' }}>
                <button onClick={() => setBlogVisible(true)}>new blog</button>
            </div>

            <div style={{ display: blogVisible ? '' : 'none' }}>
                <h3>create new</h3>
                <BlogForm
                    handleSubmit={addBlog}
                    handleNotification={addBlogNotification}
                />
                <button onClick={() => setBlogVisible(false)}>Cancel</button>
            </div>

            {[...blogs].sort(SortBlogbyLikes).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLikes={() => updateLikes(blog.id)}
                    removeBlog={() => removeBlogof(blog.id)}
                />
            ))}
        </>
    )
    const Users = () => (
        <div>
            <p> {user.name} logged in</p>
            <button onClick={handleLogout}>log out</button>
            <h3>Users</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>usernames</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((itemUser) => (
                        <tr key={itemUser.id}>
                            <td>{itemUser.name}</td>
                            <td>{itemUser.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

    return (
        <Router>
            <div>
                <>
                    <h3>blogs</h3>
                    <Notification
                        message={message}
                        style={{
                            color: 'green',
                            borderStyle: 'solid',
                            borderColor: 'green',
                            background: 'lightgray',
                            fontSize: 20,
                        }}
                    />
                </>
                <div>
                    <Link to="/users"> Users</Link>
                    <Link to="/"> Home</Link>
                </div>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/"
                        element={user === null ? LoginForms() : BlogsList()}
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
