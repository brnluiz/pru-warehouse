const db = require('../../../db')
const eventService = require('../../../event-service')
const log = require('../../../../helpers/log')

const tag = 'menu-service'

const handleCreateException = (err) => {
  if (
    err instanceof db.Sequelize.ValidationError &&
    err.name === 'SequelizeUniqueConstraintError' &&
    (err.fields.locationId && err.fields.date)
  ) {
    log.info({ err }, `[${tag}] Menu creation was not allowed due to duplicated entries`)
    return
  }

  log.error({ err }, `[${tag}] Error on menu creation`)
  throw err
}

const MenuService = {
  async get (id) {
    try {
      return db.menu.findById(id)
    } catch (err) {
      log.error({ err }, `[${tag}] Error on fetching menus`)
      throw err
    }
  },
  async getByLocation (locationSlug, startDate, endDate) {
    try {
      const location = await db.location.findOne({
        where: { slug: locationSlug }
      })

      const menus = await db.menu.findAll({
        where: { locationId: location.id }
      })

      return menus
    } catch (err) {
      log.error({ err }, `[${tag}] Error on fetching menus`)
      throw err
    }
  },
  async create (menuIn) {
    let menu
    try {
      menu = await db.menu.create(menuIn)
    } catch (err) {
      handleCreateException(err)
    }

    eventService.emit('menu.create', menu)
    log.info({ menu }, `[${tag}] Menu created`)

    return menu
  },
  async createBulk (menusIn) {
    let menus
    try {
      menus = await db.menu.bulkCreate(menusIn, { validate: true })
    } catch (err) {
      handleCreateException(err)
    }

    eventService.emit('menu.create', menus)
    log.info({ menus }, `[${tag}] Menus created`)

    return menus
  }
}

module.exports = MenuService
