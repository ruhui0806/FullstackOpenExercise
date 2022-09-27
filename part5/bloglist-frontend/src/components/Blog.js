import React from "react"
// import React, { useState } from "react"
import PropTypes from 'prop-types'


const Blog = ({ blog, addLikes, removeBlog, toggleDetailsVisibility, hiddenBlogDetails, showingBlogDetails }) => {
  // const [blogDetailVisible, setBlogDetailVisible] = useState(false)
  //the state above is moved to the App.js in order to testing the onClick event can trigger a function

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  // const toggleDetailsVisibility = () => {
  //   setBlogDetailVisible(!blogDetailVisible)
  // }

  return (
    <div style={blogStyle} className='blog'>
      {/* <div style={{ display: blogDetailVisible ? "none" : "" }} className='halfBlog'> */}
      <div style={hiddenBlogDetails} className='halfBlog'>
        <i>Title: </i> {blog.title} <button id='view-button' onClick={toggleDetailsVisibility}>view</button>
        <br />
        <i>Author: </i>{blog.author}
      </div>

      {/* <div style={{ display: blogDetailVisible ? "" : "none" }} className='fullBlog'> */}
      <div style={showingBlogDetails} className='fullBlog'>

        {/* <i>Title: </i> {blog.title} <button onClick={() => setBlogDetailVisible(false)}>hide</button> */}
        <i>Title: </i> {blog.title} <button onClick={toggleDetailsVisibility}>hide</button>
        <br />
        <i>Author: </i>{blog.author}
        <br />
        <i>Url: </i>{blog.url}
        <br />
        <i>Likes: </i>{blog.likes} <button id='like-button' onClick={addLikes}>like</button>
        <br />
        <button id='delete-button' onClick={removeBlog}>Remove</button>
      </div>

    </div>
  )
}
Blog.propTypes = {
  removeBlog: PropTypes.func.isRequired,
  addLikes: PropTypes.func.isRequired
}


export default Blog