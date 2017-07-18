module.exports = {
  up: async (queryInterface, DataType) => {
    await queryInterface.createTable('locations', {
      id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataType.STRING },
      slug: { type: DataType.STRING, unique: true },
      description: { type: DataType.TEXT, allowNull: true },
      price: { type: DataType.FLOAT },
      createdAt: { allowNull: false, type: DataType.DATE },
      updatedAt: { allowNull: false, type: DataType.DATE }
    })

    return queryInterface.createTable('menus', {
      id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
      items: { type: DataType.ARRAY(DataType.TEXT) },
      date: { type: DataType.DATEONLY },
      createdAt: { allowNull: false, type: DataType.DATE },
      updatedAt: { allowNull: false, type: DataType.DATE },
      locationId: {
        type: DataType.INTEGER,
        references: { model: 'locations', key: 'id' },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    }, {
      indexes: [
        { unique: true, fields: ['locationId', 'date'] }
      ]
    })
  },

  down: async (queryInterface, DataType) => {
    await queryInterface.dropTable('menus')
    return queryInterface.dropTable('locations')
  }
}
