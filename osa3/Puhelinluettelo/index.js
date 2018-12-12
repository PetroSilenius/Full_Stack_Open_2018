const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

app.get('/info', (request, response) => {
    response.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    <div>${new Date()}</div>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {

    if (request.body.name == undefined){
        return response.status(400).json({error:'Missing name'})
    }
    if (request.body.number == undefined){
        return response.status(400).json({error:'Missing number'})
    }
    if(persons.map(person => person.name === request.body.name)){
        return response.status(400).json({error:'Name already in use'})
    }
    const person = {
        name: request.body.name,
        number: request.body.number,
        id: Math.floor(1 + Math.random() * 1000)
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if ( person ) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})