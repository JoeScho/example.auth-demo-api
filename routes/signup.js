const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const user = req.body.username
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const userData = { name: user, password: hashedPassword }

    try {
        await req.client.set(user, JSON.stringify(userData));
    } catch (err) {
        console.log(err)
    }

    req.logger.info(`Created user ${user} successfully`)

    res.status(201).send('User created')
}

module.exports = { signup }