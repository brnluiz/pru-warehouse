const Associations = (db) => {
  db.menu.belongsTo(db.location)
  db.location.hasMany(db.menu)
}

module.exports = Associations
