const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())


mongoose
    .connect(config.mongoUrl, { useNewUrlParser: true })
    .then( () => {
        console.log('connected to database', config.mongoUrl)
    })
    .catch(error => {
        console.log(error)
    })

app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}