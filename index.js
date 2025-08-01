require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/persons')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    persons = Person.find({}).then(persons => {
        console.log(persons)
        const info = `Phonebook has info for ${persons.length} people`
        res.send(`
            <div>
                <p>${info}</p>
                <p>${Date()}</p>
            </div>`
            )
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        res.json(person)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name , number } = req.body

    Person.findById(req.params.id)
    .then(person => {
        if (!person) {
            return res.status(404).end()
        }
        person.name = name
        person.number = number

        person.save()
        .then(updatedDude => {
            res.json(updatedDude)
        })
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
    .then(() => {
        res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            "error": "content missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(person => {
        res.json(person)
    })
    .catch(err => next(err))
})

const UnknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"})
}
app.use(UnknownEndpoint)

const ErrorHanlder = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).json({error: "malformed Id"})
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }

    next(error)
}

app.use(ErrorHanlder)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
