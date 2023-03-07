const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { createClient } = require('redis');

const { loggerMiddleware, redisClient } = require('./middlewares')
const { signup, login } = require('./routes')

const port = 4000
const app = express()

const client = createClient();

app.use(cors())
app.use(bodyParser.json())
app.use(loggerMiddleware)
app.use(redisClient(client))

app.post('/signup', signup)
app.post('/login', login)

app.listen(port, async () => {
    console.log(`Listening on port ${port}`)
    await client.connect();
})