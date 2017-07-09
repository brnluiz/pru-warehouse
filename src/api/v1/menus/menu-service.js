const db = require('../../../db')
const eventService = require('../../../event-service')
const log = require('../../../../helpers/log')

const tag = 'menu-service'

const MenuService = {
  async get (id) {
    return null
  },
  async getByLocation (locationId, startDate, endDate) {
    return null
  },
  async create (menuIn) {
    try {
      const menu = await db.menu.create(menuIn)
      eventService.emit('menu.created', menu)

      return menu
    } catch (err) {
      log.error(`[${tag}] Error on menu creation`, err)
      throw err
    }
  },
  async createBulk (menusIn) {
    try {
      const menus = await db.menu.bulkCreate(menusIn, {
        validate: true
      })
      eventService.emit('menu.created', menus)

      return menus
    } catch (err) {
      log.error(`[${tag}] Error on menu creation`, err)
      throw err
    }
  }
}

module.exports = MenuService
