/* eslint-disable no-undef */
const mongoose = require('mongoose')

const password = process.argv[2]

//node mongo.js password name number
const url = `mongodb+srv://jiayuequan:${password}@fullstackopen.woyegxs.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})


const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3)
{
	console.log('Phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
}
else
{
	const name = process.argv[3]
	const number = process.argv[4]
    
	const person = new Person({
		name: name,
		number: number
	})
    
    
    
	person.save().then(result => {
		console.log(`Added ${result.name} number ${result.number} to the phonebook`)
		mongoose.connection.close()
	})
}

