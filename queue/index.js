const QueueService = require('./queue-service')

const config = require('./queue-config')
const log = require('../helpers/log')

config.channels.forEach((channel, key) => {
  channel.workers.forEach(worker => {
    QueueService.receive(channel.name, (msg) => {
      log.info(`[${channel.name}] Message received: ${msg.content.toString()}`)
      log.info(worker)
    })
  })
})
