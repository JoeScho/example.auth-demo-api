const pino = require('pino')()

const logger = pino.child({
    serviceName: 'auth-demo-api',
    owner: 'super awesome learning time team'
})

const loggerMiddleware = (req, res, next) => {
    req.logger = logger
    next()
}

module.exports = { loggerMiddleware, logger }