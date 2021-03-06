const log = require('../helpers/log')

const tag = 'event-service'
const handlers = {}

const EventService = {
  async emit (event, current, previous) {
    const message = {
      current,
      previous,
      createdAt: new Date()
    }

    log.info(message, `[${tag}] ${event} emitted`)

    if (!handlers[event]) return

    handlers[event].forEach(handler =>
      handler(message, event))
  },
  async on (event, handler) {
    handlers[event]
      ? handlers[event].push(handler)
      : handlers[event] = [handler]
  }
}

module.exports = EventService
