/* eslint-disable no-mixed-spaces-and-tabs */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()
app.use(cors())
app.use(express.static('build'))




app.use(morgan((tokens, req, res) => {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		JSON.stringify(req.body)
	].join(' ')
}))

app.use(express.json())


app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
		.catch(error => {next(error)})
})
app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(note => {
		response.json(note)
	})
		.catch(error => { next(error)})
})
app.get('/info', (request, response, next) => {

	Person.countDocuments({}).then(count => {
		response.send(`<p>Phonebook has info for ${count} people</p>${new Date().toString()}`)
	})
		.catch(error => {next(error)})
    
})
app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		// eslint-disable-next-line no-unused-vars
		.then(result => {
			response.status(204).end()
		})
		.catch(error => { next(error)

		})
    
})
app.post('/api/persons', (request, response, next) => {
	const body = request.body
    
	if (!body.name)
	{
		return response.status(400).json(
			{error: 'missing name'})
	}
	if (!body.number)
	{
		return response.status(400).json(
			{error: 'missing number'}
		)
	}
   
	const person = new Person({
		name: body.name,
		number: body.number
	})
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
    
    
})
app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const person = 
    {
    	name: body.name,
    	number: body.number
    }
	Person.findByIdAndUpdate(
		request.params.id, 
		person, 
		{new:true, runValidators: true, context: 'query'})
		.then(updatedPerson => {response.json(updatedPerson)})
		.catch(error=>{next(error)})

})
const errorHandler = (error, request, response, next) => {
    
	if (error.name === 'CastError') {
		return response.status(400).send({error: 'malformatted id'})
	}
	else if (error.name === 'ValidationError')
	{
		return response.status(400).json({error: error.message})
	}
	next(error)

}
app.use(errorHandler)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})