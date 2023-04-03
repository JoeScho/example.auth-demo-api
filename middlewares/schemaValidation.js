const Joi = require('joi');

const schemaValidation = (req, res, next) => {
    const { body } = req

    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    const { error } = schema.validate(body)

    if (error) {
        req.logger.error(error)
        return res.status(400).send(error.message)
    }

    next()
}

module.exports = { schemaValidation }