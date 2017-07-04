const Associations = (db) => {
  db.menu.location = db.menu.belongsTo(db.location)
  db.location.menus = db.location.hasMany(db.menu)
}

module.exports = Associations
