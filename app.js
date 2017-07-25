const app = require('express')()
const auth = require('express-basic-auth')

const configs = require('./configs')
const log = require('./helpers/log')

// Express middlware: auth
app.use(auth(configs.auth))

require('dotenv').config()
require('./src/api/v1')(app)

// Express middleware: error handler
app.use((error, req, res, next) => {
  if (!(error instanceof Object)) {
    res.status(500).send({ error })
  }

  const message = error.message || 'Oops... Some dog ate your request!'
  const status = error.status || 500
  res.status(status).send({ error: message })
})

// Init the server and listen to the PORT configured on the dotenv file
const port = process.env.PORT
app.listen(port, () => log.info('Up and running!'))

module.exports = app
