// eslint-why try/catch
/* eslint-disable no-empty */

const colors = require('colors')
const _compact = require('lodash/compact')
const _isEmpty = require('lodash/isEmpty')
const getLogger = require('../get_logger')
const explodePath = require('../explode_path')
const { logModuleResolved } = require('../log')
const { resolveModule, resolveGlobal } = require('./')

const SERMIT_MODULE = 'serve-markdown-it'

const l = getLogger('dynamic-require')

/**
 * Attempts to resolve a module by name from the configured `basePath`,
 * searching every directory up from it, along with the local `node_modules`
 * folder. Call with `load` `false` to get the module path.
 *
 * If the module cannot be resolved by walking the path, an attempt is made to
 * load it from the global module path.
 *
 * @throws {Error} fails if the module is not resolved.
 *
 * @param {string} moduleName - name of module passed to `require.resolve`.
 * @param {Config} config - configuration, with `basePath` set.
 * @param {boolean} [load=true] - if false, the resolved module path is
 *   returned instead of the loaded module.
 * @returns {object|Function|string} module
 *
 * @example <caption>load `markdown-it` anchor plugin</caption>
 * const parserPlugin = requireModule('markdown-it-anchor', config)
 */
const requireModule = (moduleName, config, load = true) => {
  const { state } = config
  const { basePath } = state
  const resolveArgs = { prefix: '/', suffix: 'node_modules' }
  const paths = _compact([
    ...explodePath({ ...resolveArgs, fromPath: basePath }),
    ...explodePath({ ...resolveArgs, fromPath: __dirname }),
    ...explodePath({ ...resolveArgs, fromPath: process.cwd() }),
    resolveGlobal(moduleName, resolveArgs),
    resolveGlobal(SERMIT_MODULE, resolveArgs)
  ])

  const modulePath = resolveModule(moduleName, paths)

  /* @todo extract into `ModuleNotResolvedError` */
  if (_isEmpty(modulePath)) {
    paths.forEach((p) => {
      l.info('searched %s: %s', colors.green(moduleName), colors.cyan(p))
    })

    throw new Error(`Module not found: ${moduleName}`)
  }

  logModuleResolved(moduleName, modulePath, { logger: l })

  if (!load) {
    return modulePath
  }

  // eslint-why dynamic require.
  /* eslint-disable unicorn/no-abusive-eslint-disable */
  // eslint-why config load.
  /* eslint-disable-next-line */
  return require(modulePath)
}

module.exports = requireModule
