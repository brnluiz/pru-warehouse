const Menu = (sql, DataType) => sql.define('menu', {
  items: { type: DataType.JSON },
  date: { type: DataType.DATE }
})

module.exports = Menu
