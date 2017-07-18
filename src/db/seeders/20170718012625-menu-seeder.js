module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locations', [{
      name: 'UFSC Trindade',
      slug: 'ufsc-trindade',
      price: 1.50
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locations', null, {})
  }
}
