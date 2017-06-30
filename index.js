const express = require('express')

require('dotenv').config()
const port = process.env.PORT

let app = express()

app.listen(port, () => console.log('Up and running!'))
