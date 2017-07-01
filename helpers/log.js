const bunyan = require('bunyan')
const name = require('../package.json').name
require('dotenv').config()

let streams = []

if (process.env.NODE_ENV === 'test') {
  streams.push({
    type: 'file',
    path: `/tmp/${name}.log`
  })
}

const log = bunyan.createLogger({
  name,
  streams,
  level: process.env.LOG_LEVEL || 'trace'
})

module.exports = log
