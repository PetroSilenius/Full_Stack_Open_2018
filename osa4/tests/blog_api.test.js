const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {blogsInDb, nonExistingId, initialBlogs, usersInDb, initialUsers} = require('../tests/test_helper')


describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('get one blog by id', async () => {
        const testBlog = new Blog({
            _id: '5a422b3a2b54a578634d17f9',
            title: 'Testiblogi',
            author: 'Kirjoittaja',
            url: 'http://www.valiaikainen.fi/dsdsa',
            likes: 12,
        })
        await testBlog.save()

        await api
            .get(`/api/blogs/${testBlog._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})
describe('POST /api/blogs', () => {
    test('A valid blog can be added', async () => {
        const testBlog = {
            title: 'Mauri Pekkarisen testiblogi',
            author: 'Testipoliitikko',
            url: 'http://www.parhaatblogit.fi/5345',
            likes: 0
        }

        const blogsBefore = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length+1)
        expect(blogsAfter).toContainEqual(newBlog)
    })

    test('Adding blog without title or url doesnt work', async () => {
        const testBlog = {
            author: 'Testipoliitikko',
            likes: 0
        }

        const blogsBefore = await blogsInDb()

        await api.post('/api/blogs')
            .send(testBlog)
            .expect(400)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length)
    })

    test('Testing blog with no likes', async () => {
        const testBlog = {
            title: 'Mauri Pekkarisen testiblogi',
            author: 'Testipoliitikko',
            url: 'http://www.parhaatblogit.fi/5345',
            likes: 0
        }

        const blogsBefore = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(201)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length+1)
        const checkBlogs = blogsAfter
            .map(({ title, likes }) => ({ title, likes }));
        expect(checkBlogs).toContainEqual({ title: testBlog.title, likes: 0 });
    })
})

describe('deletion of a blog', async () => {

    let testBlog

    beforeAll(async () => {
        testBlog = new Blog({
            title: 'Mac Sandels',
            author: 'Jack Adams',
            url: 'http://www.bestblogs.com/5345',
            likes: 0
        })
        await testBlog.save()
    })

    test('DELETE /api/notes/:id succeeds with proper statuscode', async () => {
        const blogsBefore = await blogsInDb()

        await api
            .delete(`/api/blogs/${testBlog._id}`)
            .expect(204)

        const blogsAfter = await blogsInDb()

        const titles = blogsAfter.map(r => r.title)

        expect(titles).not.toContain(testBlog.title)
        expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    })
})
describe('PUT /api/blogs/:id', async () => {
    test('Likes of an existing blog can be modified', async () => {
        const testBlog = new Blog({
            _id: '5a422b3a2b54a578634d17f9',
            title: 'Testiblogi',
            author: 'Kirjoittaja',
            url: 'http://www.valiaikainen.fi/dsdsa',
            likes: 12,
        })
        await testBlog.save()

        const blogsBefore = await blogsInDb()

        await api.put(`/api/blogs/${testBlog._id}`)
            .send({id: testBlog._id, likes: 7, author: 'Uusi kaveri'})
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await blogsInDb()
        expect(blogsAfter.length).toBe(blogsBefore.length)

        const blogsModified = blogsAfter
            .map(({title, author, likes}) => ({title, author, likes}))

        expect(blogsModified).toContainEqual({
            title: testBlog.title,
            author: 'Uusi kaveri',
            likes: 7,
        })
    })
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'pvsile',
            name: 'Petro Silenius',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
        const usernames = usersAfterOperation.map(u=>u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body).toEqual({ error: 'Username must be unique'})

        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test ('too short passwords are not allowed', async () => {
        const testUser = {
            username: 'testi',
            name: 'matti mallikas',
            password: 'xy',
        }

        const usersBefore = await usersInDb()

        await api.post('/api/users')
            .send(testUser)
            .expect(400)

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('taken usernames are not allowed', async () => {
        const usersBefore = await usersInDb()

        await api.post('/api/users')
            .send(initialUsers[1])
            .expect(400)

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    })
})

    afterAll(() => {
        server.close()
    })

