const QueueConfig = {
  channels: [{
    name: 'location.collect',
    workers: [
      { method: 'POST', url: '//localhost:8080' }
    ]
  }, {
    name: 'location.test',
    workers: [
      { method: 'POST', url: '//localhost:8080' }
    ]
  }]
}

module.exports = QueueConfig
