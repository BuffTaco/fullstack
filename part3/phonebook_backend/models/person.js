const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
console.log("Connecting to", url)

mongoose.connect(url).then(result => {
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.log("Failed to connect to MongDB:", error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String
})

//const Person = mongoose.model("Person", personSchema)
personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model("Person", personSchema)