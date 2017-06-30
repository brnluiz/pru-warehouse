const app = require('express')()
const log = require('./helpers/log')

require('./api/v1')(app)
require('dotenv').config()

// Init the server and listen to the PORT configured on the dotenv file
const port = process.env.PORT
app.listen(port, () => log.info('Up and running!'))
