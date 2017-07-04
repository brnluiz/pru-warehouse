const Location = (sql, DataType) => sql.define('location', {
  name: { type: DataType.STRING },
  description: { type: DataType.STRING, allowNull: true },
  price: { type: DataType.FLOAT }
})

module.exports = Location
