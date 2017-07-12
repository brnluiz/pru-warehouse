const menuService = require('../menu-service')

const menusGetByLocation = async (req, res, next) => {
  const locationSlug = req.params.locationSlug
  const startDate = req.query.date || req.query.startDate
  const endDate = req.query.endDate

  try {
    const menus = await menuService
      .getByLocation(locationSlug, startDate, endDate)
    res.status(200).send(menus)
    next()
  } catch (err) {
    return next(err)
  }
}

module.exports = menusGetByLocation
