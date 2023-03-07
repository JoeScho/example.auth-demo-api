const redisClient = client => (req, res, next) => {
    req.client = client
    next()
}

module.exports = { redisClient }