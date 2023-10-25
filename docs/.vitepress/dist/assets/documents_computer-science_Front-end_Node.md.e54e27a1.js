import{_ as s,o,c as n,Q as e,k as a}from"./chunks/framework.4719a631.js";const f=JSON.parse('{"title":"Node 简介","description":"","frontmatter":{},"headers":[],"relativePath":"documents/computer-science/Front-end/Node.md","filePath":"documents/computer-science/Front-end/Node.md"}'),l={name:"documents/computer-science/Front-end/Node.md"},p=e(`<p>#Node</p><h1 id="node-简介" tabindex="-1">Node 简介 <a class="header-anchor" href="#node-简介" aria-label="Permalink to &quot;Node 简介&quot;">​</a></h1><p>node.js 是一个基于 chrome V8 引擎的 javascript 运行环境<code>runtime</code>，不是一门语言，不包含 BOM 和 DOM</p><p>js 由 ECMAScript，DOM, BOM 组成</p><p>node.js 由 ECMAScript 和 Node 模块 API 组成</p><h1 id="模块导入导出" tabindex="-1">模块导入导出 <a class="header-anchor" href="#模块导入导出" aria-label="Permalink to &quot;模块导入导出&quot;">​</a></h1><h2 id="import" tabindex="-1">import <a class="header-anchor" href="#import" aria-label="Permalink to &quot;import&quot;">​</a></h2><h2 id="require" tabindex="-1">require <a class="header-anchor" href="#require" aria-label="Permalink to &quot;require&quot;">​</a></h2><h2 id="export" tabindex="-1">export <a class="header-anchor" href="#export" aria-label="Permalink to &quot;export&quot;">​</a></h2><p>module.export 优先级要高于 export</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">demo1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;demo1&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.export </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">demo1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&#39;demo2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">demo1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;demo1&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.export </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">demo1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&#39;demo2&#39;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h1 id="fs-模块" tabindex="-1">fs 模块 <a class="header-anchor" href="#fs-模块" aria-label="Permalink to &quot;fs 模块&quot;">​</a></h1><h2 id="fs-readfile" tabindex="-1">fs.readFile() <a class="header-anchor" href="#fs-readfile" aria-label="Permalink to &quot;fs.readFile()&quot;">​</a></h2><p>文件读取</p><p><code>fs.readFile(&#39;path&#39;, &#39;encode scheme&#39;, callback)</code></p>`,15),t=a("ul",null,[a("li",null,"path： 文件路径(./demo.js)"),a("li",null,"encode scheme：编码方式（utf-8...）"),a("li",{"err:":"","状态码，":"","doc:":"",文件读取结果:""},"callback，回调函数(err, doc)=>")],-1),r=e('<h2 id="fs-writefile" tabindex="-1">fs.writeFile() <a class="header-anchor" href="#fs-writefile" aria-label="Permalink to &quot;fs.writeFile()&quot;">​</a></h2><p>文件写入</p><p><code>fs.writeFile(&#39;path&#39;, content, callback)</code></p><ul><li>path： 文件路径(./demo.txt)</li><li>content：文件写入内容</li><li>callback，回调函数(err, doc)=&gt;{ err: 状态码， doc: 文件写入结果 }，注，如果当前文件夹中没有 path 中写入的对应文件</li></ul><p>，那么会直接新建一个文件</p><p>##path 模块</p><p>Q: 为什么需要 path 模块？</p><p>A: 因为在不同的操作系统中，path 的写法不固定，windows 上是/, linux 上是/</p><h2 id="path-join" tabindex="-1">path.join <a class="header-anchor" href="#path-join" aria-label="Permalink to &quot;path.join&quot;">​</a></h2><p>路径拼接</p><p><code>path.join(&#39;path1&#39;, &#39;path2&#39;, ...)</code></p><ul><li>path1： 文件路径 1</li><li>path2：文件路径 2</li><li>...</li></ul><p>例如，要读取 User/Documents/Demo/demo.txt，那么，就可以使用</p><p>path.join(&#39;User&#39;, &#39;Documents&#39;, &#39;Demo&#39;, &#39;demo.txt&#39;)来进行路径编写</p><p>但是一般来说，我们在 fs.readFile 时会使用绝对路径，而不使用相对路径，因为相对路径一般是相对于命令行当前所在目录，而不是文件所在目录，故而使用<code>__dirname</code>来表示当前的文件所处目录</p><p>path.join(__dirname, &#39;01demo.js&#39;)</p><h1 id="第三方模块" tabindex="-1">第三方模块 <a class="header-anchor" href="#第三方模块" aria-label="Permalink to &quot;第三方模块&quot;">​</a></h1><h2 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-label="Permalink to &quot;npm&quot;">​</a></h2><p>npm (node package management) node 的第三方模块管理工具</p><p>###nrm</p><p>nrm (npm registry manager) npm 下载地址切换工具，可用于管理镜像源</p><h2 id="gulp" tabindex="-1">gulp <a class="header-anchor" href="#gulp" aria-label="Permalink to &quot;gulp&quot;">​</a></h2>',22),c=[p,t,r];function i(d,h,m,u,E,y){return o(),n("div",null,c)}const b=s(l,[["render",i]]);export{f as __pageData,b as default};
