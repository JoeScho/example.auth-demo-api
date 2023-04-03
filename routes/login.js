const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { username, password } = req.body
    req.logger.info(`Attempting login`)
    let userString

    try {
        userString = await req.client.get(username);
    } catch (err) {
        req.logger.error('Error connecting to database', err)
        return res.status(500).send('Something went wrong. Please try again later.')
    }
    const user = JSON.parse(userString)

    if (!user) {
        req.logger.warn(`User ${username} not found`)
        return res.status(404).send('User not found')
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (passwordMatches) {
        req.logger.info(`Login successful for user ${username}`)
        return res.send({
            sessionId: uuid()
        })
    }

    req.logger.warn(`Login failed for user ${username}`)
    res.status(401).send('Username and / or password invalid')
}

module.exports = { login }