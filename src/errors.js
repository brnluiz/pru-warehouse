const path = require('path')
const log = require('../helpers/log')

const component = path.basename(module.parent.filename, '.js')

function NotFoundError (msg, err) {
  this.status = 404
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

function ValidationError (msg, err) {
  this.status = 400
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = ValidationError

function GenericError (msg, err) {
  this.status = 500
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
GenericError.prototype = Object.create(Error.prototype)
GenericError.prototype.constructor = GenericError

module.exports = {
  GenericError,
  NotFoundError,
  ValidationError
}
