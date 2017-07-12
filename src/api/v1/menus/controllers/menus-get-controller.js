const menuService = require('../menu-service')

const menuGetController = async (req, res, next) => {
  const menuId = req.params.menuId
  try {
    const menu = await menuService.get(menuId)
    res.status(200).send(menu)
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = menuGetController
