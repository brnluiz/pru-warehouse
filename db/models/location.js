const Location = (sql, Sequelize) => sql.define('location', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING, allowNull: true },
  price: { type: Sequelize.FLOAT }
})

module.exports = Location
