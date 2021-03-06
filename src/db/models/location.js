const Location = (sql, DataType) => sql.define('location', {
  name: { type: DataType.STRING },
  slug: { type: DataType.STRING, unique: true },
  description: { type: DataType.TEXT, allowNull: true },
  price: { type: DataType.FLOAT }
})

module.exports = Location
