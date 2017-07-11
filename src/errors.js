const path = require('path')
const log = require('../helpers/log')

const makeError = (status, msg, err) => {
  const error = new Error(msg)
  error.status = status
  error.message = msg

  const component = path.basename(module.parent.filename, '.js')
  if (err) log.info(`[${component}] ${msg}`, { err })

  return error
}

const NotFound = (msg, err) => makeError(404, msg, err)
const ValidationError = (msg, err) => makeError(400, msg, err)
const Generic = (msg, err) => makeError(500, msg, err)

module.exports = {
  Generic,
  NotFound,
  ValidationError
}
