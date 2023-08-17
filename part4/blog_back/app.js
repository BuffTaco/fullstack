const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info("Connecting to", config.mongoUrl)

mongoose.connect(config.mongoUrl).then(result => {
	logger.info('Connected to MongoDB')
})
	.catch((error) => {
		logger.error('Failed to connect to MongDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)

module.exports = app