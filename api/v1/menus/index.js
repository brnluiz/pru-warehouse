const router = require('express').Router()

// TODO: returns the menu for a specific location
router.get('/:location', (req, res, next) => {
  res.sendstatus(200)
  next()
})

// TODO: returns the menu for a specific location and date
router.get('/:location/:date', (req, res, next) => {
  res.sendstatus(200)
  next()
})

module.exports = router
