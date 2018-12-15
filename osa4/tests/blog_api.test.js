const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {blogsInDb, nonExistingId, initialBlogs, formatBlog} = require('../tests/test_helper')


describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
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
        });
        await testBlog.save();

        const blogsBefore = await blogsInDb();

        await api.put(`/api/blogs/${testBlog._id}`)
            .send({id: testBlog._id, likes: 7, author: 'Uusi kaveri'})
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAfter = await blogsInDb();
        expect(blogsAfter.length).toBe(blogsBefore.length);

        const blogsModified = blogsAfter
            .map(({title, author, likes}) => ({title, author, likes}));

        expect(blogsModified).toContainEqual({
            title: testBlog.title,
            author: 'Uusi kaveri',
            likes: 7,
        })
    })
})

    afterAll(() => {
        server.close()
    })

