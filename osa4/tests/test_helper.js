const Blog = require('../models/blog')
const formatBlog = require('../controllers/blogs')
const User = require('../models/user')


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

const initialUsers = [
    {
        username: 'MikkoMaino',
        name: 'Mikko Mainio',
        password: 'salasana1',
        adult: true,
    },
    {
        username: 'MarikaMukava ',
        name: 'Marika Mukava',
        password: 'JanneKoira57',
        adult: false,
    },
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

const usersInDb = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    blogsInDb, nonExistingId, initialBlogs, usersInDb, initialUsers
}