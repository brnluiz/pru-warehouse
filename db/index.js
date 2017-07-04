const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config()

// Connect to the database
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
)

// Initialize db object
const db = { sequelize, Sequelize }

// Models loading
fs.readdirSync(`${__dirname}/models`)
  .forEach(file => {
    const component = path.basename(file, '.js')
    db[component] = require(`./models/${component}`)(db.sequelize, db.Sequelize)
  })

// Associations
require('./associations')(db)

module.exports = db
