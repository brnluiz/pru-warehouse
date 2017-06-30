const app = require('express')()

require('./api/v1')(app)
require('dotenv').config()

// Init the server and listen to the PORT configured on the dotenv file
const port = process.env.PORT
app.listen(port, () => console.log('Up and running!'))
