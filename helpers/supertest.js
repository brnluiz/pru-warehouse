const supertest = require('supertest')

require('dotenv').config()

module.exports = supertest(`http://localhost:${process.env.PORT}`)
