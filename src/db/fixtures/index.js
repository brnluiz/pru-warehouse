const fs = require('fs')
const path = require('path')

// Models loading
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const component = path.basename(file, '.js')
    module.exports[component] = require(`./${component}`)
  })
