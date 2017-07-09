const menuService = require('../menu-service')

const menuGetController = async (req, res, next) => {
  const menuId = req.params.menuId
  const menu = await menuService.get(menuId)

  res.status(200).send(menu)

  next()
}

module.exports = menuGetController
