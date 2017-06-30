const router = require('express').Router()

// TODO: queue a broadcast message to all users with enabled notifications
router.post('/broadcast', (req, res, next) => {
  res.sendstatus(200)
  next()
})

// TODO: using the request body, send a message to the specified user
router.post('/:user/message', (req, res, next) => {
  res.sendstatus(200)
  next()
})

module.exports = router
