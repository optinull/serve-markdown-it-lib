const path = require('path')
const { promises: fs } = require('fs')
const fsExtra = require('fs-extra')

/**
 * @private
 */
const renderAsset = async ({ srcPath, buildPath }) => {
  const buildDir = path.dirname(buildPath)

  try {
    await fs.access(buildDir)
  } catch (e) {
    await fs.mkdir(buildDir, { recursive: true })
  }

  await fsExtra.copy(srcPath, buildPath, {
    overwrite: true,
    dereference: true
  })
}

module.exports = renderAsset
