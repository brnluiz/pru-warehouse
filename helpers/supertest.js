const request = require('supertest')

require('dotenv').config()

let supertest
if (process.env.NODE_ENV === 'test') {
  supertest = request(require('../app'))
} else {
  supertest = request(`http://localhost:${process.env.PORT}`)
}

module.exports = supertest
