const Menu = (sql, Sequelize) => sql.define('menu', {
  items: { type: Sequelize.JSON },
  date: { type: Sequelize.DATE }
})

module.exports = Menu
