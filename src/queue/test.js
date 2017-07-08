const QueueService = require('./queue-service')
QueueService.send('location.collect', 'i wanna know')
QueueService.send('location.test', 'have you ever')
QueueService.send('location.collect', 'seen the rain')
