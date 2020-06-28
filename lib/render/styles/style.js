const { promises: fs } = require('fs')
const sass = require('sass')

/**
 * @private
 */
const renderStyle = async ({
  srcPath, buildPath, includePaths, compressed = true
}) => {
  const res = sass.renderSync({
    outputStyle: compressed ? 'compressed' : 'expanded',
    outFile: buildPath,
    file: srcPath,
    includePaths
  })

  await fs.writeFile(buildPath, res.css.toString())

  return res.css
}

module.exports = renderStyle
