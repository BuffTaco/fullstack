const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log('Connecting to', url)

// eslint-disable-next-line no-unused-vars
mongoose.connect(url).then(result => {
	console.log('Connected to MongoDB')
})
	.catch((error) => {
		console.log('Failed to connect to MongDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: (v) => {
				return /^([0-9]{2,3})-(\d{1,})$/.test(v)
			}
		},
		required: true
	}
})

//const Person = mongoose.model("Person", personSchema)
personSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	}
})

module.exports = mongoose.model('Person', personSchema)