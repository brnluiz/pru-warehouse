const amqp = require('amqplib')

const log = require('../../helpers/log')

const QueueService = {
  async receive (queue, consumer) {
    const conn = await amqp.connect('amqp://localhost')
    const channel = await conn.createChannel()

    await channel.assertQueue(queue, { durable: false })
    await channel.consume(queue, msg => {
      if (!msg) return

      consumer(msg)
      channel.ack(msg)
    })
  },
  async send (queue, msg) {
    const conn = await amqp.connect('amqp://localhost')
    const channel = await conn.createChannel()

    await channel.assertQueue(queue, { durable: false })
    channel.sendToQueue(queue, Buffer.from(msg))

    log.info(`[${queue}] message sent: ${msg}`)
  }
}

module.exports = QueueService
