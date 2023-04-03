const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const user = req.body.username
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const userData = { name: user, password: hashedPassword }

    try {
        await req.client.set(user, JSON.stringify(userData));
    } catch (err) {
        req.logger.error('Error creating user', err)
        return res.status(500).send('Something went wrong')
    }

    req.logger.info(`Created user ${user} successfully`)

    res.status(201).send({
        sessionId: uuid(),
        message: 'User created'
    })
}

module.exports = { signup }