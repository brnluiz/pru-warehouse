const location = require('./location')()
const moment = require('moment')

const menu = {
  id: 1,
  items: [
    'Fish and Chips',
    'Gelato'
  ],
  date: moment().format('YYYY-MM-DD'),
  location
}

module.exports = () => menu
