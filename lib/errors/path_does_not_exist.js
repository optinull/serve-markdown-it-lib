const { sep: pathSeperator } = require('path')
const colors = require('colors')
const _isError = require('lodash/isError')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')

/**
 * Error thrown when a path does not exist.
 *
 * @todo colorize stack trace if `color` enabled.
 *
 * @class
 * @augments Error
 * @example
 * throw new PathDoesNotExist('/some/path')
 */
class PathDoesNotExistError extends Error {
  /**
   * Generate a messsage for {@link PathDoesNotExistError}.
   *
   * @param {string} path - path that does not exist.
   * @param {string|Error} [fsError] - original native error or native message.
   * @param {boolean} [color=true] - colorizes message.
   * @returns {string} message - error message
   *
   * @example
   * const message = PathDoesNotExistError.genMessage('/some/path')
   *
   * console.log(message)
   */
  static message (path, fsError, color = true) {
    const { magenta, cyan, underline } = colors
    const label = 'path does not exist:'
    const message = color
      ? `${magenta(label)} ${cyan(underline(path))}`
      : `${label} ${path}`

    return _isError(fsError)
      ? `${message} [${fsError.message}]`
      : _isString(fsError)
        ? `${message} [${fsError}]`
        : message
  }

  /**
   * Create a new {@link PathDoesNotExistError} object.
   *
   * @param {string} path - path that does not exist.
   * @param {string|Error} [fsError] - original native error or native message.
   * @param {boolean} [color] - enables colorized message.
   * @param {string} [message] - error message override
   * @param {string[]} [stack] - stack trace override
   *
   * @example
   * const err = new PathDoesNotExistError('/some/path')
   *
   * console.log(`non-existent path: ${err.path}`)
   * console.log(`non-existent path parts: ${err.parts}`)
   * console.log(`non-existent path dir name: ${err.dirname}`)
   * console.log(`non-existent path base name: ${err.basename}`)
   * console.log(`non-existent path extension: ${err.extname}`)
   *
   * console.error(err.stack)
   */
  constructor (path, fsError, color, message, stack) {
    super(message || PathDoesNotExistError.message(path, fsError, color))

    // eslint-why obv
    /* eslint-disable-next-line prefer-destructuring */
    this.name = 'PathDoesNotExistError'

    if (!_isEmpty(stack)) {
      this.stack = stack
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }

    this._path = path
    this._color = color
    this._fsError = fsError
  }

  /**
   * Get the non-existent path.
   *
   * @returns {string} path - path supplied to error.
   */
  get path () {
    return this._path
  }

  /**
   * Get the non-existent path parts.
   *
   * @returns {string[]} pathParts - path split by system path seperator.
   */
  get parts () {
    return this._path.split(pathSeperator)
  }

  /**
   * Get the color setting.
   *
   * @returns {boolean} color - indicates if the error message will be
   *   colorized
   */
  get color () {
    return this._color
  }

  /**
   * Get the original FS error object.
   *
   * @returns {Error} fsError
   */
  get fsError () {
    return this._fsError
  }
}

module.exports = PathDoesNotExistError
