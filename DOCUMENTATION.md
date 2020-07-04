## Modules

<dl>
<dt><a href="#module_serve-markdown-it-lib">serve-markdown-it-lib</a></dt>
<dd><p>Shared utility library for the <a href="https://github.com/f3rno/serve-markdown-it">serve-markdown-it</a> utility
and supported templates, plugins, and other extensions. Provides general
utilities (@see <a href="requireDynamicModule">requireDynamicModule</a>), and methods to render
template (@see <a href="https://github.com/f3rno/serve-markdown-it-template-default">serve-markdown-it-template-default</a>) assets
and SCSS stylesheets.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#PathDoesNotExistError">PathDoesNotExistError</a> ⇐ <code>Error</code></dt>
<dd><p>Error thrown when a path does not exist.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#renderAssets">renderAssets(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Renders a map of <code>{ [dest]: src }</code> path pairs representing static assets,
either files or folders.</p>
</dd>
<dt><a href="#renderStyles">renderStyles(params)</a> ⇒ <code>Promise</code></dt>
<dd><p>Renders a map of <code>{ [dest]: src }</code> path pairs representing SCSS stylesheets.</p>
</dd>
<dt><a href="#explodePath">explodePath(params)</a> ⇒ <code>Array.&lt;strings&gt;</code></dt>
<dd><p>Generates an array of paths from &#39;/&#39; up to the provided path.</p>
</dd>
<dt><a href="#fsStat">fsStat(path, [returnError])</a> ⇒ <code>Promise</code></dt>
<dd><p>Safe wrapper for <code>fs.stat</code> with returns <code>null</code> or <code>Error</code> on failure instead
of throwing.</p>
</dd>
<dt><a href="#getGitIgnore">getGitIgnore(config)</a> ⇒ <code>ignore</code></dt>
<dd><p>Attempts to load any <code>.gitignore</code> file in the configured content root
and returns a configured instance of <a href="https://github.com:kaelzhang/node-ignore">ignore</a>.</p>
</dd>
<dt><a href="#getLogger">getLogger(scope)</a> ⇒ <code>Signale</code></dt>
<dd><p>Creates a new scoped <a href="https://github.com/klaussinani/signale">signale</a> logger instance.</p>
</dd>
<dt><a href="#getRelativePath">getRelativePath(absPath, config)</a> ⇒ <code>string</code></dt>
<dd><p>Converts the provided absolute path to a path relative to the configured
content root, with a <code>/</code> prefix for linking in rendered HTML.</p>
</dd>
<dt><a href="#logModuleResolved">logModuleResolved(moduleName, modulePath, [params])</a></dt>
<dd><p>Logs successful module resolution.</p>
</dd>
<dt><a href="#resolveGlobal">resolveGlobal(moduleName, [params])</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Safe wrapper around <a href="external:resolve-global">external:resolve-global</a> that returns <code>null</code> on
failure instead of throwing.</p>
</dd>
<dt><a href="#requireModule">requireModule(moduleName, config, [load])</a> ⇒ <code>object</code> | <code>function</code> | <code>string</code></dt>
<dd><p>Attempts to resolve a module by name from the configured <code>basePath</code>,
searching every directory up from it, along with the local <code>node_modules</code>
folder. Call with <code>load</code> <code>false</code> to get the module path.</p>
<p>If the module cannot be resolved by walking the path, an attempt is made to
load it from the global module path.</p>
</dd>
<dt><a href="#resolveModule">resolveModule(moduleName, [paths])</a> ⇒ <code>null</code> | <code>string</code></dt>
<dd><p>Safe wrapper around <code>require.resolve</code> that retuns <code>null</code> on failure instead
of throwing an error.</p>
</dd>
<dt><a href="#readAsset">readAsset(config, assetPath)</a> ⇒ <code><a href="#AssetData">AssetData</a></code></dt>
<dd><p>Attempts to read a template asset from disk.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#AssetData">AssetData</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_serve-markdown-it-lib"></a>

## serve-markdown-it-lib
Shared utility library for the [serve-markdown-it](https://github.com/f3rno/serve-markdown-it) utility
and supported templates, plugins, and other extensions. Provides general
utilities (@see [requireDynamicModule](requireDynamicModule)), and methods to render
template (@see [serve-markdown-it-template-default](https://github.com/f3rno/serve-markdown-it-template-default)) assets
and SCSS stylesheets.

**See**: [serve-markdown-it](https://github.com/f3rno/serve-markdown-it)  
**License**: MIT  
<a name="PathDoesNotExistError"></a>

## PathDoesNotExistError ⇐ <code>Error</code>
Error thrown when a path does not exist.

**Kind**: global class  
**Extends**: <code>Error</code>  
**Todo**

- [ ] colorize stack trace if `color` enabled.


* [PathDoesNotExistError](#PathDoesNotExistError) ⇐ <code>Error</code>
    * [new PathDoesNotExistError(path, [fsError], [color], [message], [stack])](#new_PathDoesNotExistError_new)
    * _instance_
        * [.path](#PathDoesNotExistError+path) ⇒ <code>string</code>
        * [.parts](#PathDoesNotExistError+parts) ⇒ <code>Array.&lt;string&gt;</code>
        * [.color](#PathDoesNotExistError+color) ⇒ <code>boolean</code>
        * [.fsError](#PathDoesNotExistError+fsError) ⇒ <code>Error</code>
    * _static_
        * [.message(path, [fsError], [color])](#PathDoesNotExistError.message) ⇒ <code>string</code>

<a name="new_PathDoesNotExistError_new"></a>

### new PathDoesNotExistError(path, [fsError], [color], [message], [stack])
Create a new [PathDoesNotExistError](#PathDoesNotExistError) object.


| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path that does not exist. |
| [fsError] | <code>string</code> \| <code>Error</code> | original native error or native message. |
| [color] | <code>boolean</code> | enables colorized message. |
| [message] | <code>string</code> | error message override |
| [stack] | <code>Array.&lt;string&gt;</code> | stack trace override |

**Example**  
```js
const err = new PathDoesNotExistError('/some/path')

console.log(`non-existent path: ${err.path}`)
console.log(`non-existent path parts: ${err.parts}`)
console.log(`non-existent path dir name: ${err.dirname}`)
console.log(`non-existent path base name: ${err.basename}`)
console.log(`non-existent path extension: ${err.extname}`)

console.error(err.stack)
```
<a name="PathDoesNotExistError+path"></a>

### pathDoesNotExistError.path ⇒ <code>string</code>
Get the non-existent path.

**Kind**: instance property of [<code>PathDoesNotExistError</code>](#PathDoesNotExistError)  
**Returns**: <code>string</code> - path - path supplied to error.  
<a name="PathDoesNotExistError+parts"></a>

### pathDoesNotExistError.parts ⇒ <code>Array.&lt;string&gt;</code>
Get the non-existent path parts.

**Kind**: instance property of [<code>PathDoesNotExistError</code>](#PathDoesNotExistError)  
**Returns**: <code>Array.&lt;string&gt;</code> - pathParts - path split by system path seperator.  
<a name="PathDoesNotExistError+color"></a>

### pathDoesNotExistError.color ⇒ <code>boolean</code>
Get the color setting.

**Kind**: instance property of [<code>PathDoesNotExistError</code>](#PathDoesNotExistError)  
**Returns**: <code>boolean</code> - color - indicates if the error message will be
  colorized  
<a name="PathDoesNotExistError+fsError"></a>

### pathDoesNotExistError.fsError ⇒ <code>Error</code>
Get the original FS error object.

**Kind**: instance property of [<code>PathDoesNotExistError</code>](#PathDoesNotExistError)  
**Returns**: <code>Error</code> - fsError  
<a name="PathDoesNotExistError.message"></a>

### PathDoesNotExistError.message(path, [fsError], [color]) ⇒ <code>string</code>
Generate a messsage for [PathDoesNotExistError](#PathDoesNotExistError).

**Kind**: static method of [<code>PathDoesNotExistError</code>](#PathDoesNotExistError)  
**Returns**: <code>string</code> - message - error message  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path that does not exist. |
| [fsError] | <code>string</code> \| <code>Error</code> |  | original native error or native message. |
| [color] | <code>boolean</code> | <code>true</code> | colorizes message. |

**Example**  
```js
const message = PathDoesNotExistError.genMessage('/some/path')

console.log(message)
```
<a name="renderAssets"></a>

## renderAssets(params) ⇒ <code>Promise</code>
Renders a map of `{ [dest]: src }` path pairs representing static assets,
either files or folders.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params. |
| params.assets | <code>object</code> | asset dest paths key'ed by src path. Source   paths starting with `~` are assumed module paths, and loaded via   [requireDynamicModule](requireDynamicModule). |
| params.srcPath | <code>string</code> | absolute path to asset src folder. |
| params.buildPath | <code>string</code> | absolute path to asset build folder. |
| [params.requirePath] | <code>string</code> | path to directory containing   `node_modules`; used to resolve module assets, not passed to   `require.resolve`! |
| [params.quiet] | <code>boolean</code> | if false, progress is logged to the.   console. |
| [params.dry] | <code>boolean</code> | if true, progress is logged but not files   are modified. |

**Example** *(rendering assets to &#x60;public/&#x60;)*  
```js
renderAssets({
  dry: true,
  quiet: false,
  requirePath: path.join(__dirname, '../'),
  buildPath: path.join(__dirname, '../public'),
  srcPath: path.join(__dirname, '../res/assets'),
  assets: {
    fonts: 'fonts', // asset folder
    'css/highlightjs': '~highlight.js/styles' // module folder
  }
})
```
<a name="renderStyles"></a>

## renderStyles(params) ⇒ <code>Promise</code>
Renders a map of `{ [dest]: src }` path pairs representing SCSS stylesheets.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to array of rendered CSS stylesheets  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params. |
| params.styles | <code>object</code> | scss stylesheet dest paths key'ed by src   path. |
| params.includePaths | <code>Array.&lt;string&gt;</code> | array of absolute include paths to   resolve `@import` statements. |
| params.srcPath | <code>string</code> | absolute path to scss src folder. |
| params.buildPath | <code>string</code> | absolute path to scss build folder. |
| [params.quiet] | <code>boolean</code> | if false, progress is logged to the.   console. |
| [params.dry] | <code>boolean</code> | if true, progress is logged but not files   are modified. |

**Example** *(rendering styles to &#x60;public/css&#x60;)*  
```js
renderStyles({
  dry: true,
  quiet: false,
  requirePath: path.join(__dirname, '../'),
  buildPath: path.join(__dirname, '../public/css'),
  srcPath: path.join(__dirname, '../res/styles'),
  styles: {
   'index.css': 'index.scss'
  }
})
```
<a name="explodePath"></a>

## explodePath(params) ⇒ <code>Array.&lt;strings&gt;</code>
Generates an array of paths from '/' up to the provided path.

**Kind**: global function  
**Returns**: <code>Array.&lt;strings&gt;</code> - paths  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | params |
| params.fromPath | <code>string</code> |  | path to explode. |
| [params.directory] | <code>boolean</code> |  | indicates `basePath` is a directory;   if not provided, the path is checked to resolve directory/file. |
| [params.prefix] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | prefix for all generated paths. |
| [params.suffix] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | suffix for all generated paths. |
| [params.paths] | <code>Array.&lt;Array&gt;</code> | <code>[]</code> | target array to append generated paths  too |

**Example**  
```js
await explodePath(__dirname, { prefix: '/', suffix: 'node_modules' })
const module = require.resolve(moduleName, { paths: searchPaths })
```
<a name="fsStat"></a>

## fsStat(path, [returnError]) ⇒ <code>Promise</code>
Safe wrapper for `fs.stat` with returns `null` or `Error` on failure instead
of throwing.

**Kind**: global function  
**Returns**: <code>Promise</code> - p - resolves to `Stats`, `null`, or `Error` object on
  failure.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>string</code> |  | path to pass to `fs.stat` |
| [returnError] | <code>boolean</code> | <code>false</code> | if true, `Error` object is returned   on failure instead of `null`. |

**Example**  
```js
const _isNull = require('lodash/isNull')
const _isError = require('lodash/isError')

info = await statPath('/some/path')

if (_isNull(info)) {
  console.log('path does not exist')
} else {
  console.log('path stats: ', JSON.stringify(info))
}

info = await statPath('/some/path', true)

if (_isError(info)) {
  console.error(info.stack)
} else {
  console.log('path stats: ', JSON.stringify(info))
}
```
<a name="getGitIgnore"></a>

## getGitIgnore(config) ⇒ <code>ignore</code>
Attempts to load any `.gitignore` file in the configured content root
and returns a configured instance of [ignore](https://github.com:kaelzhang/node-ignore).

**Kind**: global function  
**Returns**: <code>ignore</code> - ignore  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Config</code> | configuration data, with `basePath` set. |

**Example** *(load &#x60;.gitignore&#x60; and filter paths)*  
```js
const nodes = {}
const ig = await getGitIgnore(config)
const allNodes = await fs.readdir(srcPath, { withFileTypes: true })

allNodes
  .filter(n => n.isFile() || n.isDirectory())
  .forEach((n) => { nodes[n.name] = n })

const visibleNodes = excludeGitIgnore
  ? ig.filter(_keys(nodes)).map(n => nodes[n])
  : _keys(nodes).map(n => nodes[n])

// do something with visibleNodes array...
```
<a name="getLogger"></a>

## getLogger(scope) ⇒ <code>Signale</code>
Creates a new scoped [signale](https://github.com/klaussinani/signale) logger instance.

**Kind**: global function  
**Returns**: <code>Signale</code> - l  

| Param | Type | Description |
| --- | --- | --- |
| scope | <code>string</code> | scope |

**Example**  
```js
const l = getLogger('template:render-md')
```
<a name="getRelativePath"></a>

## getRelativePath(absPath, config) ⇒ <code>string</code>
Converts the provided absolute path to a path relative to the configured
content root, with a `/` prefix for linking in rendered HTML.

**Kind**: global function  
**Returns**: <code>string</code> - relPath  

| Param | Type | Description |
| --- | --- | --- |
| absPath | <code>string</code> | absolute path |
| config | <code>Config</code> | config |

**Example**  
```js
const { state } = config
const { template } = state
const { genRawSrcMarkdown } = template
const relPath = getRelativePath('/home/user/markdown-it/README.md', config)

await genRawSrcMarkdown({ relPath, ...genData })
```
<a name="logModuleResolved"></a>

## logModuleResolved(moduleName, modulePath, [params])
Logs successful module resolution.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| moduleName | <code>string</code> |  | name of module. |
| modulePath | <code>string</code> |  | path to module. |
| [params] | <code>object</code> | <code>{}</code> | optional params |
| [params.logger] | <code>Signale</code> |  | [signale](https://github.com/klaussinani/signale) logger instance,   defaults to plain unscoped logger. |
| [params.lType] | <code>string</code> | <code>&quot;&#x27;debug&#x27;&quot;</code> | signale logger type to use. |
| [params.loaded] | <code>boolean</code> |  | indicates if module was loaded or only the   path was resolved. |
| [params.color] | <code>boolean</code> |  | enables colorized output. |

**Example** *(log module resolution)*  
```js
logModuleResolved('serve-markdown-it', process.cwd(), { color: false })
```
<a name="resolveGlobal"></a>

## resolveGlobal(moduleName, [params]) ⇒ <code>string</code> \| <code>null</code>
Safe wrapper around [external:resolve-global](external:resolve-global) that returns `null` on
failure instead of throwing.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - globalModulePath  

| Param | Type | Description |
| --- | --- | --- |
| moduleName | <code>string</code> | module to resolve globally. |
| [params] | <code>object</code> | optional params |
| [params.prefix] | <code>string</code> | resolved path prefix |
| [params.suffix] | <code>string</code> | resolved path suffix |

**Example**  
```js
const modulePath = resolveGlobal('serve-markdown-it')
```
<a name="requireModule"></a>

## requireModule(moduleName, config, [load]) ⇒ <code>object</code> \| <code>function</code> \| <code>string</code>
Attempts to resolve a module by name from the configured `basePath`,
searching every directory up from it, along with the local `node_modules`
folder. Call with `load` `false` to get the module path.

If the module cannot be resolved by walking the path, an attempt is made to
load it from the global module path.

**Kind**: global function  
**Returns**: <code>object</code> \| <code>function</code> \| <code>string</code> - module  
**Throws**:

- <code>Error</code> fails if the module is not resolved.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| moduleName | <code>string</code> |  | name of module passed to `require.resolve`. |
| config | <code>Config</code> |  | configuration, with `basePath` set. |
| [load] | <code>boolean</code> | <code>true</code> | if false, the resolved module path is   returned instead of the loaded module. |

**Example** *(load &#x60;markdown-it&#x60; anchor plugin)*  
```js
const parserPlugin = requireModule('markdown-it-anchor', config)
```
<a name="resolveModule"></a>

## resolveModule(moduleName, [paths]) ⇒ <code>null</code> \| <code>string</code>
Safe wrapper around `require.resolve` that retuns `null` on failure instead
of throwing an error.

**Kind**: global function  
**Returns**: <code>null</code> \| <code>string</code> - modulePath - null on failure.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| moduleName | <code>string</code> |  | name of module to resolve path to. |
| [paths] | <code>null</code> \| <code>Array.&lt;string&gt;</code> | <code>[]</code> | paths to attempt resolve from; passed   through `_uniq`. |

**Example** *(resolve from cwd)*  
```js
const modulePath = resolveModule('serve-markdown-it-lib', [process.cwd()])

if (_isEmpty(modulePath)) {
  return
}

const module = require(modulePath)
```
<a name="readAsset"></a>

## readAsset(config, assetPath) ⇒ [<code>AssetData</code>](#AssetData)
Attempts to read a template asset from disk.

**Kind**: global function  
**Returns**: [<code>AssetData</code>](#AssetData) - data  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Config</code> | configuration, with `basePath` set. |
| assetPath | <code>string</code> | relative to template `public` folder. |

**Example** *(read and serve template asset)*  
```js
const serveAsset = async (ctx, url, config) => {
  try {
    const { type, src } = await readAsset(config, url)

    ctx.body = src
    ctx.type = type
    ctx.renderType = 'asset'

    return true
  } catch (e) {
    return false
  }
}
```
<a name="AssetData"></a>

## AssetData : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>Buffer</code> | asset contents |
| type | <code>string</code> | mime type, defaults to 'text/plain' if not   resolved. |

