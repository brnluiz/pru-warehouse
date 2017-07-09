const db = require('../../../db')
const eventService = require('../../../event-service')
const log = require('../../../../helpers/log')

const tag = 'menu-service'

const duplicatedItems = (err) => (
  err instanceof db.Sequelize.ValidationError &&
  err.name === 'SequelizeUniqueConstraintError' &&
  (err.fields.locationId && err.fields.date)
)

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

      log.info({ menu }, `[${tag}] Menu created`)

      return menu
    } catch (err) {
      if (duplicatedItems) {
        log.info({ err }, `[${tag}] Menu creation was not allowed due to duplicated entries`)
        return
      }

      log.error({ err }, `[${tag}] Error on menu creation`)
      throw err
    }
  },
  async createBulk (menusIn) {
    try {
      const menus = await db.menu.bulkCreate(menusIn, {
        validate: true
      })
      eventService.emit('menu.created', menus)

      log.info({ menus }, `[${tag}] Menus created`)

      return menus
    } catch (err) {
      if (duplicatedItems) {
        log.info({ err }, `[${tag}] Menu creation was not allowed due to duplicated entries`)
        return
      }

      log.error({ err }, `[${tag}] Error on menu creation`)
      throw err
    }
  }
}

module.exports = MenuService
