const location = require('./location')
const moment = require('moment')

module.exports = {
  id: 1,
  items: [
    'Fish and Chips',
    'Gelato'
  ],
  date: moment().toISOString(),
  location
}
