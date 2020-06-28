const path = require('path')
const { promises: fs } = require('fs')
const mime = require('mime-types')

/**
 * @typedef {object} AssetData
 * @property {Buffer} src - asset contents
 * @property {string} type - mime type, defaults to 'text/plain' if not
 *   resolved.
 */

/**
 * Attempts to read a template asset from disk.
 *
 * @param {Config} config - configuration, with `basePath` set.
 * @param {string} assetPath - relative to template `public` folder.
 * @returns {AssetData} data
 *
 * @example <caption>read and serve template asset</caption>
 * const serveAsset = async (ctx, url, config) => {
 *   try {
 *     const { type, src } = await readAsset(config, url)
 *
 *     ctx.body = src
 *     ctx.type = type
 *     ctx.renderType = 'asset'
 *
 *     return true
 *   } catch (e) {
 *     return false
 *   }
 * }
 */
const readAsset = async (config, assetPath) => {
  const { state } = config
  const { template } = state
  const { publicPath } = template

  const srcPath = path.join(publicPath, assetPath)
  const src = await fs.readFile(srcPath)
  const type = mime.lookup(path.basename(srcPath)) || 'text/plain'

  return { src, type }
}

module.exports = readAsset
