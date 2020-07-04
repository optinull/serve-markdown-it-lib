const { promises: fs } = require('fs')
const { PathDoesNotExistError } = require('../../errors')

/**
 * Safe wrapper for `fs.stat` with returns `null` or `Error` on failure instead
 * of throwing.
 *
 * @param {string} path - path to pass to `fs.stat`
 * @param {boolean} [returnError=false] - if true, `Error` object is returned
 *   on failure instead of `null`.
 * @returns {Promise} p - resolves to `Stats`, `null`, or `Error` object on
 *   failure.
 *
 * @example
 * const _isNull = require('lodash/isNull')
 * const _isError = require('lodash/isError')
 *
 * info = await statPath('/some/path')
 *
 * if (_isNull(info)) {
 *   console.log('path does not exist')
 * } else {
 *   console.log('path stats: ', JSON.stringify(info))
 * }
 *
 * info = await statPath('/some/path', true)
 *
 * if (_isError(info)) {
 *   console.error(info.stack)
 * } else {
 *   console.log('path stats: ', JSON.stringify(info))
 * }
 */
const fsStat = (path, returnError) => {
  try {
    return fs.stat(path)
  } catch (error) {
    return returnError
      ? new PathDoesNotExistError(path, error)
      : null
  }
}

module.exports = fsStat
