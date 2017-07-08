const Menu = (sql, DataType) => sql.define('menu', {
  items: { type: DataType.ARRAY(DataType.TEXT) },
  date: { type: DataType.DATE }
})

module.exports = Menu
