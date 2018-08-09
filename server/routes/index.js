const trees = require('./tree')

module.exports = (app) => {
  app.use('/trees', trees)
  // etc..
}