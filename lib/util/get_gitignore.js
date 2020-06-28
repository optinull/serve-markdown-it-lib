const path = require('path')
const { promises: fs } = require('fs')
const _isEmpty = require('lodash/isEmpty')
const ignore = require('ignore')

/**
 * @external ignore
 * @see https://github.com:kaelzhang/node-ignore
 */

/**
 * Attempts to load any `.gitignore` file in the configured content root
 * and returns a configured instance of {@link external:ignore}.
 *
 * @param {Config} config - configuration data, with `basePath` set.
 * @returns {ignore} ignore
 *
 * @example <caption>load `.gitignore` and filter paths</caption>
 * const nodes = {}
 * const ig = await getGitIgnore(config)
 * const allNodes = await fs.readdir(srcPath, { withFileTypes: true })
 *
 * allNodes
 *   .filter(n => n.isFile() || n.isDirectory())
 *   .forEach((n) => { nodes[n.name] = n })
 *
 * const visibleNodes = excludeGitIgnore
 *   ? ig.filter(_keys(nodes)).map(n => nodes[n])
 *   : _keys(nodes).map(n => nodes[n])
 *
 * // do something with visibleNodes array...
 */
const getGitIgnore = async (config) => {
  const { state } = config
  const { basePath } = state
  const info = await fs.stat(basePath, { withFileTypes: true })
  const srcPath = info.isFile()
    ? path.join(path.dirname(basePath), '.gitignore')
    : path.join(basePath, '.gitignore')

  const ig = ignore()

  ig.add(['.git'])

  try {
    const gitignoreSrc = await fs.readFile(srcPath, 'utf-8')
    const entries = gitignoreSrc
      .split('\n')
      .map(ln => ln.trim())
      .filter(ln => !_isEmpty(ln))

    ig.add(entries)

  // eslint-why control flow
  /* eslint-disable-next-line no-empty */
  } catch (e) {}

  return ig
}

module.exports = getGitIgnore
