const renderAssets = require('./render/assets')
const renderStyles = require('./render/styles')
const getLogger = require('./util/get_logger')
const readAsset = require('./util/read_asset')
const getGitIgnore = require('./util/get_gitignore')
const getRelativePath = require('./util/get_relative_path')
const requireDynamicModule = require('./util/require_dynamic_module')

module.exports = {
  getLogger,
  readAsset,
  getGitIgnore,
  renderAssets,
  renderStyles,
  getRelativePath,
  requireDynamicModule
}
