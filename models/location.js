const Sequelize = require('sequelize')
const sql = require('../helpers/sql')

const Location = sql.define('location', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING, allowNull: true },
  price: { type: Sequelize.FLOAT }
})

module.exports = Location
