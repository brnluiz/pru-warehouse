const menuService = require('../menu-service')

const menusGetByLocation = async (req, res, next) => {
  const locationSlug = req.params.locationSlug
  try {
    const menus = await menuService.getByLocation(locationSlug)

    res.status(200).send(menus)
    next()
  } catch (err) {
    return next(err)
  }
}

module.exports = menusGetByLocation
