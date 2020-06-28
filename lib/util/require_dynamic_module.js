const path = require('path')
const { promises: fs } = require('fs')
const resolveGlobal = require('resolve-global')

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
 * const parserPlugin = requireDynamicModule('markdown-it-anchor', config, true)
 */
const requireDynamicModule = async (moduleName, config, load = true) => {
  const { state } = config
  const { basePath } = state
  const paths = [path.join(__dirname, '../../')]
  const info = await fs.stat(basePath, { withFileTypes: true })
  const baseDir = info.isDirectory()
    ? basePath
    : path.dirname(basePath)

  const baseDirParts = baseDir.split(path.sep)

  paths.push(...baseDirParts.map((_, i) => (
    path.join(...baseDirParts.slice(0, baseDirParts.length - i).join(path.sep))
  )))

  let modulePath = require.resolve(moduleName, { paths })

  if (!modulePath) {
    modulePath = resolveGlobal(moduleName)
  }

  if (!modulePath) {
    throw new Error(`Dynamic module not found: ${moduleName}`)
  }

  if (!load) {
    return modulePath
  }

  // eslint-why dynamic require.
  /* eslint-disable unicorn/no-abusive-eslint-disable */
  // eslint-why config load.
  /* eslint-disable-next-line */
  return require(modulePath)
}

module.exports = requireDynamicModule
