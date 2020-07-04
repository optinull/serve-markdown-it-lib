const resolveModule = require('./resolve')
const requireModule = require('./require')
const resolveGlobal = require('./global')

module.exports = {
  requireModule,
  resolveModule,
  resolveGlobal
}
