const renderAssets = require('./render/assets')
const renderStyles = require('./render/styles')
const getLogger = require('./util/get_logger')
const readAsset = require('./util/read_asset')
const getGitIgnore = require('./util/get_gitignore')
const getRelativePath = require('./util/get_relative_path')
const requireModule = require('./util/modules/require')

module.exports = {
  getLogger,
  readAsset,
  getGitIgnore,
  renderAssets,
  renderStyles,
  getRelativePath,
  requireModule
}
