const path = require('path')
const colors = require('colors')
const PI = require('p-iteration')
const _keys = require('lodash/keys')
const _isEmpty = require('lodash/isEmpty')
const _isObject = require('lodash/isObject')
const getLogger = require('../../util/get_logger')
const renderAsset = require('./asset')

const l = getLogger('render-assets')

/**
 * Renders a map of `{ [dest]: src }` path pairs representing static assets,
 * either files or folders.
 *
 * @param {object} params - params.
 * @param {object} params.assets - asset dest paths key'ed by src path. Source
 *   paths starting with `~` are assumed module paths, and loaded via
 *   {@link requireDynamicModule}.
 * @param {string} params.srcPath - absolute path to asset src folder.
 * @param {string} params.buildPath - absolute path to asset build folder.
 * @param {string} [params.requirePath] - path to directory containing
 *   `node_modules`; used to resolve module assets, not passed to
 *   `require.resolve`!
 * @param {boolean} [params.quiet] - if false, progress is logged to the.
 *   console.
 * @param {boolean} [params.dry] - if true, progress is logged but not files
 *   are modified.
 * @returns {Promise} p
 *
 * @example <caption>rendering assets to `public/`</caption>
 * renderAssets({
 *   dry: true,
 *   quiet: false,
 *   requirePath: path.join(__dirname, '../'),
 *   buildPath: path.join(__dirname, '../public'),
 *   srcPath: path.join(__dirname, '../res/assets'),
 *   assets: {
 *     fonts: 'fonts', // asset folder
 *     'css/highlightjs': '~highlight.js/styles' // module folder
 *   }
 * })
 */
const renderAssets = async ({
  assets, requirePath, srcPath, buildPath, quiet, dry
}) => {
  const start = Date.now()
  const assetBuildPaths = _keys(assets)
  const modulePath = requirePath || path.join(__dirname, '../../../')

  if (_isEmpty(assetBuildPaths)) {
    l.star('no assets to render')
    return
  }

  await PI.map(assetBuildPaths, async (destPath) => {
    const startFile = Date.now()
    const { [destPath]: assetDef } = assets
    const assetPath = _isObject(assetDef) ? assetDef.path : assetDef
    const assetOptions = _isObject(assetDef) ? assetDef : {}
    const assetSrcPath = assetPath.startsWith('~')
      ? path.join(modulePath, assetPath.replace(/^~/u, 'node_modules/'))
      : path.join(srcPath, assetPath)

    let assetData = null

    if (!dry) {
      assetData = await renderAsset({
        srcPath: assetSrcPath,
        options: assetOptions,
        buildPath: path.join(buildPath, destPath)
      })
    }

    if (!quiet) {
      l.info(
        'rendered asset %s%s %s',
        colors.white(`${path.basename(srcPath)}/`),
        colors.green(assetPath),
        dry
          ? colors.cyan('[dry]')
          : colors.blue(`in ${Date.now() - startFile}ms`)
      )
    }

    return assetData
  })

  l.success(
    'rendered %d assets %s',
    assetBuildPaths.length,
    colors.blue(`(in ${Date.now() - start}ms)`)
  )
}

module.exports = renderAssets
