const path = require('path')
const _compact = require('lodash/compact')
const resolveGlobalUtil = require('resolve-global')

/**
 * Safe wrapper around {@link external:resolve-global} that returns `null` on
 * failure instead of throwing.
 *
 * @param {string} moduleName - module to resolve globally.
 * @param {object} [params] - optional params
 * @param {string} [params.prefix] - resolved path prefix
 * @param {string} [params.suffix] - resolved path suffix
 * @returns {string|null} globalModulePath
 *
 * @example
 * const modulePath = resolveGlobal('serve-markdown-it')
 */
const resolveGlobal = (moduleName, params = {}) => {
  const { prefix, suffix } = params

  try {
    const modulePath = path.dirname(resolveGlobalUtil(moduleName))

    return path.join(...(_compact([prefix, modulePath, suffix])))
  } catch (e) {
    return null
  }
}

module.exports = resolveGlobal
