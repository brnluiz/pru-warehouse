const bunyan = require('bunyan')
const name = require('../package.json').name
require('dotenv').config()

const log = bunyan.createLogger({
  name,
  level: process.env.LOG_LEVEL || 'trace'
})

if (process.env.NODE_ENV === 'development') {
  log.addStream({
    type: 'file',
    path: `/tmp/${name}.log`
  })
}

module.exports = log
