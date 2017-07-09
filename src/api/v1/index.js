const fs = require('fs')
const log = require('../../../helpers/log')
const path = require('path')

const dir = __dirname

const isDirectory = (dir, file) =>
  fs.lstatSync(path.join(dir, file)).isDirectory()

const importComponent = (app, component) => {
  log.info(`Added route /${component}`)
  return app.use(`/`, require(`./${component}`))
}

const routes = (app) =>
  fs.readdirSync(dir)
    .filter(file => isDirectory(dir, file))
    .forEach(component => importComponent(app, component))

module.exports = routes
