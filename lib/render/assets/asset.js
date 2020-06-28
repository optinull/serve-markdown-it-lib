const { promises: fs } = require('fs')
const path = require('path')

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

  const asset = await fs.readFile(srcPath)

  await fs.writeFile(buildPath, asset)

  return asset
}

module.exports = renderAsset
