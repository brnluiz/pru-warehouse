const bunyan = require('bunyan')
const name = require('../package.json').name

const log = bunyan.createLogger({
  name,
  level: process.env.LOG_LEVEL || 'trace'
})

module.exports = log
