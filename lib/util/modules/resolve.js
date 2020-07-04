const _uniq = require('lodash/uniq')

/**
 * Safe wrapper around `require.resolve` that retuns `null` on failure instead
 * of throwing an error.
 *
 * @param {string} moduleName - name of module to resolve path to.
 * @param {null|string[]} [paths=[]] - paths to attempt resolve from; passed
 *   through `_uniq`.
 * @returns {null|string} modulePath - null on failure.
 *
 * @example <caption>resolve from cwd</caption>
 * const modulePath = resolveModule('serve-markdown-it-lib', [process.cwd()])
 *
 * if (_isEmpty(modulePath)) {
 *   return
 * }
 *
 * const module = require(modulePath)
 */
const resolveModule = (moduleName, paths = []) => {
  try {
    return require.resolve(moduleName, { paths: _uniq(paths) })
  } catch (e) {
    return null
  }
}

module.exports = resolveModule
