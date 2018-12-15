import React from 'react'

const BlogForm = ({addBlog, handleFieldChange, newBlogTitle, newBlogAuthor, newBlogUrl}) => {
    return(
        <div>
            <h2>Lisää uusi blogi</h2>
            <form onSubmit={addBlog}>
                <input
                    value={newBlogTitle}
                    onChange={handleFieldChange}
                />
                <input
                    value={newBlogAuthor}
                    onChange={handleFieldChange}
                />
                <input
                    value={newBlogUrl}
                    onChange={handleFieldChange}
                />
                <button type="submit">Tallenna</button>
            </form>
        </div>
    )
}

export default BlogForm