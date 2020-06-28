# serve-markdown-it-lib

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

Shared utility library for **[sermit](https://github.com/f3rno/serve-markdown-it)**

### [Installation](#installation)
![npm badge](https://nodei.co/npm/serve-markdown-it-lib.png?downloads=true&downloadRank=true&stars=true)

```bash
yarn add serve-markdown-it-lib
```

### [Developing](#developing)

```bash
yarn gen-readme // update README.md
yarn docs // update DOCUMENTATION.md
yarn test // lint & mocha
yarn update-deps // bump all deps
```

### [Release History](#release_history)

See *[CHANGELOG.md](CHANGELOG.md)* for more information.

### [License](#license)

Distributed under the **MIT** license. See [LICENSE.md](LICENSE.md) for more information.

### [Contributing](#contributing)

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

---

## [API Reference](#api_reference)

> The standalone JSDoc reference can be found in [DOCUMENTATION.md](DOCUMENTATION.md)

## Modules

<dl>
<dt><a href="#module_serve-markdown-it-lib">serve-markdown-it-lib</a></dt>
<dd><p>Shared utility library for the <a href="https://github.com/f3rno/serve-markdown-it">serve-markdown-it</a> utility
and supported templates, plugins, and other extensions. Provides general
utilities (@see <a href="#requireDynamicModule">requireDynamicModule</a>), and methods to render
template (@see <a href="https://github.com/f3rno/serve-markdown-it-template-default">serve-markdown-it-template-default</a>) assets
and SCSS stylesheets.</p>
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
<dt><a href="#readAsset">readAsset(config, assetPath)</a> ⇒ <code><a href="#AssetData">AssetData</a></code></dt>
<dd><p>Attempts to read a template asset from disk.</p>
</dd>
<dt><a href="#requireDynamicModule">requireDynamicModule(moduleName, config, [load])</a> ⇒ <code>object</code> | <code>function</code> | <code>string</code></dt>
<dd><p>Attempts to resolve a module by name from the configured <code>basePath</code>,
searching every directory up from it, along with the local <code>node_modules</code>
folder. Call with <code>load</code> <code>false</code> to get the module path.</p>
<p>If the module cannot be resolved by walking the path, an attempt is made to
load it from the global module path.</p>
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
utilities (@see [requireDynamicModule](#requireDynamicModule)), and methods to render
template (@see [serve-markdown-it-template-default](https://github.com/f3rno/serve-markdown-it-template-default)) assets
and SCSS stylesheets.

**See**: [serve-markdown-it](https://github.com/f3rno/serve-markdown-it)  
**License**: MIT  
<a name="renderAssets"></a>

## renderAssets(params) ⇒ <code>Promise</code>
Renders a map of `{ [dest]: src }` path pairs representing static assets,
either files or folders.

**Kind**: global function  
**Returns**: <code>Promise</code> - p  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | params. |
| params.assets | <code>object</code> | asset dest paths key'ed by src path. Source   paths starting with `~` are assumed module paths, and loaded via   [requireDynamicModule](#requireDynamicModule). |
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
<a name="requireDynamicModule"></a>

## requireDynamicModule(moduleName, config, [load]) ⇒ <code>object</code> \| <code>function</code> \| <code>string</code>
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
const parserPlugin = requireDynamicModule('markdown-it-anchor', config, true)
```
<a name="AssetData"></a>

## AssetData : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>Buffer</code> | asset contents |
| type | <code>string</code> | mime type, defaults to 'text/plain' if not   resolved. |



<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/serve-markdown-it-lib.svg?style=flat-square
[npm-url]: https://npmjs.org/package/serve-markdown-it-lib
[npm-downloads]: https://img.shields.io/npm/dm/serve-markdown-it-lib.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/f3rno/serve-markdown-it-lib/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/f3rno/serve-markdown-it-lib
