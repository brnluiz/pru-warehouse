const app = require('express')()
const log = require('./helpers/log')

require('./src/api/v1')(app)
require('dotenv').config()

// Init the server and listen to the PORT configured on the dotenv file
const port = process.env.PORT
app.listen(port, () => log.info('Up and running!'))

app.use((error, req, res, next) => {
  if (!(error instanceof Object)) {
    res.status(500).send({ error })
  }

  const message = error.message || 'Oops... Some dog ate your request!'
  const status = error.status || 500
  res.status(status).send({ error: message })
})

module.exports = app
