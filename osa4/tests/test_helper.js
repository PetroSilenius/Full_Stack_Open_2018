const Blog = require('../models/blog')
const formatBlog = require('../controllers/blogs')


const initialBlogs = [
    {
        title: 'Mauri Pekkarisen testiblogi',
        author: 'Testipoliitikko',
        url: 'http://www.parhaatblogit.fi/5345',
        likes: 0
    },
    {
        title: 'Makaroonia ja ketsuppia',
        author: 'Köyhä_opiskelija',
        url: 'https://www.halvatblogit.fi/opiskeluajat/15',
        likes: 3
    }
]

const nonExistingId = async () => {
    const blog = new Note()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs
}

module.exports = {
    blogsInDb, nonExistingId, initialBlogs, formatBlog
}