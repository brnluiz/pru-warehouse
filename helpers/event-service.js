const log = require('./log')

const tag = 'event-service'
const handlers = {}

const EventService = {
  async emit (event, payload) {
    log.info(`[${tag}] ${event} received`, payload)
  },
  async on (event, handler) {
    handlers[event]
      ? handlers[event].push(handler)
      : handlers[event] = [handler]
  }
}

module.exports = EventService
