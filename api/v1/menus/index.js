const router = require('express').Router()

router.get('/:location', (req, res, next) => {
  res.sendstatus(200)
  next()
})

router.post('/collect', (req, res, next) => {
  res.sendstatus(200)
  next()
})

router.post('/collect/:location', (req, res, next) => {
  res.sendstatus(200)
  next()
})

module.exports = router
