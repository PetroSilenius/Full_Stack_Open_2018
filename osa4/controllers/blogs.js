const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

formatBlog = blog => ({
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find()
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    if (request.body.title === undefined || request.body.url === undefined) {
        return response.status(400).json({ error: 'Title or url missing' })
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes === undefined ? 0 : request.body.likes,
    })
   const savedBlog = await blog.save()
    response.status(201).json(savedBlog._id)
})

blogsRouter.delete('/:id', async(request, response) => {

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request,response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(formatBlog(blog))

})


module.exports = blogsRouter