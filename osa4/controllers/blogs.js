const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog
            .find()
            .populate('user', {username: 1, name: 1, adult: 1})
        response.json(blogs.map(Blog.format))
    }catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }
})

blogsRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (blog) {
            response.json(Blog.format(blog))
        } else {
            response.status(404).end()
        }
    }catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }
})


blogsRouter.post('/', async (request, response) => {
    try {
        const {token} = request
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id){
            return response.status(401).json({ error: 'Token missing or invalid'})
        }

        if (request.body.title === undefined || request.body.url === undefined) {
            return response.status(400).json({error: 'Title or url missing'})
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes === undefined ? 0 : request.body.likes,
            user: user._id,
        })
        const savedBlog = await blog.save()

        user.notes = user.notes.concat(savedBlog._id)
        await user.save()

        response.json(Blog.format(blog))
    } catch(exception) {
        if(exception.name === 'JsonWebTokenError'){
            response.status(401).json({ error: exception.message })
        }
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }
})

blogsRouter.delete('/:id', async(request, response) => {

    try {

        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(204).end()
        }

        const {token} = request
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!(token && decodedToken.id)) {
            return response.status(401).json({error: 'Token missing or invalid'})
        }

        if (!blog.user) {
            await blog.remove()
            return response.status(204).end()
        }

        if (blog.user.toString() !== decodedToken.id) {
            return response.status(401).json({error: 'User does not have permission'})
        }

        const user = await User.findById(decodedToken.id)

        await blog.remove()

        user.blogs = user.blogs.filter(b => b._id.toString() !== req.params.id)
        await user.save()

        return response.status(204).end()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: exception.message })
        }
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }
})

blogsRouter.put('/:id', async(request,response) => {
    try {
        const blog = {
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes
        }

        await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.json(Blog.format(blog))
    }catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }

})


module.exports = blogsRouter