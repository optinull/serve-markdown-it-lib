const colors = require('colors')
const _isFunction = require('lodash/isFunction')
const getLogger = require('../get_logger')

const l = getLogger()
const { cyan, green, yellow, black, bgYellow } = colors

/**
 * Logs successful module resolution.
 *
 * @param {string} moduleName - name of module.
 * @param {string} modulePath - path to module.
 * @param {object} [params={}] - optional params
 * @param {Signale} [params.logger] - {@link external:signale} logger instance,
 *   defaults to plain unscoped logger.
 * @param {string} [params.lType='debug'] - signale logger type to use.
 * @param {boolean} [params.loaded] - indicates if module was loaded or only the
 *   path was resolved.
 * @param {boolean} [params.color] - enables colorized output.
 *
 * @example <caption>log module resolution</caption>
 * logModuleResolved('serve-markdown-it', process.cwd(), { color: false })
 */
const logModuleResolved = (moduleName, modulePath, params = {}) => {
  const { loaded, lType = 'debug', color = true, logger = l } = params

  if (!_isFunction(logger[lType])) {
    throw new Error(`logger has no log type ${lType}`)
  }

  logger[lType](
    'resolved %s: %s [%s]',
    color ? cyan(moduleName) : moduleName,
    color ? green(modulePath) : modulePath,
    loaded
      ? color ? bgYellow(black('loaded')) : 'loaded'
      : color ? yellow('not loaded') : 'not loaded'
  )
}

module.exports = logModuleResolved
