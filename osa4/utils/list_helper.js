const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum,blogs) => {
        return sum + blogs.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, current) => (
        max.likes > current.likes ? max : current
    )
    const favorite = blogs.reduce(reducer, blogs[0])
    return [favorite.title, favorite.author, favorite.likes]
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = (author) => {
        const reducer = (sum, blog) => sum + (blog.author === author ? 1 : 0)
        return blogs.reduce(reducer, 0)
    }
    const reducer = (max, current) => (
        max.blogs > current.blogs ? max : current
    )
    const authorWithMostBlogs =
        blogs
            .map(({author}) => ({author, blogs: blogsByAuthor(author)}))
            .reduce(reducer)
    return [authorWithMostBlogs]
}

const mostLikes = (blogs) => {
    const blogsByAuthorLikes = (author) => {
        const reducer = (sum, blog) => sum + (blog.author === author ? blog.likes : 0)
        return blogs.reduce(reducer, 0)
    }
    const reducer = (max, current) => (
        max.likes > current.likes ? max : current
    )
    const authorWithMostLikes =
        blogs
            .map(({author}) => ({author, likes: blogsByAuthorLikes(author)}))
            .reduce(reducer)
    return [authorWithMostLikes]
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
