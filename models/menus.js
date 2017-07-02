const Sequelize = require('sequelize')
const sql = require('../helpers/sql')

const Location = require('./location')

const Menu = sql.define('menu', {
  items: { type: Sequelize.JSON },
  locationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Location,
      key: 'id'
    }
  },
  date: { type: Sequelize.DATE }
})

module.exports = Menu
