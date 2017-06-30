const router = require('express').Router()

// TODO: queue the collection process of all enabled locations
router.post('/collect', (req, res, next) => {
  res.sendstatus(200)
  next()
})

// TODO: start the collection process for the specified location
router.post('/collect/:location', (req, res, next) => {
  res.sendstatus(200)
  next()
})

module.exports = router
