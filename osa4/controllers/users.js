const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    try {
        const users = await User
            .find({})
            .populate('blogs')

        response.json(users.map(User.format))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'Something went wrong...'})
    }
})

usersRouter.post('/', async (request, response) => {
    try {
        const existingUser = await User.find({username: request.body.username})
        if(existingUser.length > 0){
            return response.status(400).json({ error: 'Username must be unique'})
        }

        if(request.body.password.length <= 3){
            return response.status(400).json ({ error: 'Password is too short'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash,
            adult: request.body.adult === undefined ? true : request.body.adult,
        })

        const savedUser = await user.save()
        response.json(User.format(savedUser))

    } catch (exception){
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = usersRouter