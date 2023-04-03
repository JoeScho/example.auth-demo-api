const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { createClient } = require('redis');

const { loggerMiddleware, redisClient, schemaValidation } = require('./middlewares')
const { logger } = require('./middlewares/logger')
const { signup, login } = require('./routes')

const port = 4000
const app = express()

const client = createClient();

app.use(cors())
app.use(bodyParser.json())
app.use(loggerMiddleware)
app.use(redisClient(client))
app.use(schemaValidation)

app.post('/signup', signup)
app.post('/login', login)

app.listen(port, async () => {
    logger.info(`Listening on port ${port}`)
    try {
        await client.connect();
    } catch (err) {
        logger.error('Unable to connect to database')
        // throw err
    }
})