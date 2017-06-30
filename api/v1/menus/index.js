const router = require('express').Router()

router.get('/:location', (req, res, next) => {
  res.sendStatus(200)
  next()
})

router.post('/collect', (req, res, next) => {

})

router.post('/collect/:location', (req, res, next) => {

})

module.exports = router
