const path = require('path')
const colors = require('colors')
const _keys = require('lodash/keys')
const _isEmpty = require('lodash/isEmpty')
const PI = require('p-iteration')
const getLogger = require('../../util/get_logger')
const renderStyle = require('./style')

const l = getLogger('render-sass')

/**
 * Renders a map of `{ [dest]: src }` path pairs representing SCSS stylesheets.
 *
 * @param {object} params - params.
 * @param {object} params.styles - scss stylesheet dest paths key'ed by src
 *   path.
 * @param {string[]} params.includePaths - array of absolute include paths to
 *   resolve `@import` statements.
 * @param {string} params.srcPath - absolute path to scss src folder.
 * @param {string} params.buildPath - absolute path to scss build folder.
 * @param {boolean} [params.quiet] - if false, progress is logged to the.
 *   console.
 * @param {boolean} [params.dry] - if true, progress is logged but not files
 *   are modified.
 * @returns {Promise} p - resolves to array of rendered CSS stylesheets
 *
 * @example <caption>rendering styles to `public/css`</caption>
 * renderStyles({
 *   dry: true,
 *   quiet: false,
 *   requirePath: path.join(__dirname, '../'),
 *   buildPath: path.join(__dirname, '../public/css'),
 *   srcPath: path.join(__dirname, '../res/styles'),
 *   styles: {
 *    'index.css': 'index.scss'
 *   }
 * })
 */
const renderStyles = async ({
  styles, includePaths, srcPath, buildPath, quiet, dry
}) => {
  const cssSources = await PI.map(_keys(styles), async (styleDest) => {
    const styleSrcPath = path.join(srcPath, styles[styleDest])
    const styleBuildPath = path.join(buildPath, styleDest)
    const start = Date.now()
    const styleName = path.basename(styleBuildPath)
    let css = null

    if (!dry) {
      css = await renderStyle({
        buildPath: styleBuildPath,
        srcPath: styleSrcPath,
        includePaths,
        quiet,
        dry
      })
    }

    if (!quiet) {
      l.info(
        'rendered style %s%s %s',
        colors.white(`${path.basename(styleSrcPath)}/`),
        colors.green(styleName),
        dry
          ? colors.cyan('[dry]')
          : colors.blue(`in ${Date.now() - start}ms`)
      )
    }

    return css
  })

  return cssSources.filter(css => !_isEmpty(css))
}

module.exports = renderStyles
