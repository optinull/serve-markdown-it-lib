const path = require('path')
const _isArray = require('lodash/isArray')

/**
 * Generates an array of paths from '/' up to the provided path.
 *
 * @param {object} params - params
 * @param {string} params.fromPath - path to explode.
 * @param {boolean} [params.directory] - indicates `basePath` is a directory;
 *   if not provided, the path is checked to resolve directory/file.
 * @param {string} [params.prefix=''] - prefix for all generated paths.
 * @param {string} [params.suffix=''] - suffix for all generated paths.
 * @param {Array[]} [params.paths=[]] - target array to append generated paths
 *  too
 * @returns {strings[]} paths
 *
 * @example
 * await explodePath(__dirname, { prefix: '/', suffix: 'node_modules' })
 * const module = require.resolve(moduleName, { paths: searchPaths })
 */
const explodePath = (params = {}) => {
  const { fromPath, prefix, suffix, paths = [] } = params
  const pathParts = fromPath.split(path.sep)
  const generatedPaths = pathParts.map((_, i) => {
    const subPath = path.join(...pathParts.slice(0, pathParts.length - i))

    return path.join(...[prefix, subPath, suffix])
  })

  if (_isArray(paths)) {
    paths.push(...generatedPaths)
  }

  return paths
}

module.exports = explodePath
