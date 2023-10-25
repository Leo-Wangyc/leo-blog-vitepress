import{_ as a,o as s,c as e,Q as t}from"./chunks/framework.4719a631.js";const b=JSON.parse('{"title":"git 命令","description":"","frontmatter":{},"headers":[],"relativePath":"documents/computer-science/Git.md","filePath":"documents/computer-science/Git.md"}'),n={name:"documents/computer-science/Git.md"},o=t(`<p>Git</p><h1 id="git-命令" tabindex="-1">git 命令 <a class="header-anchor" href="#git-命令" aria-label="Permalink to &quot;git 命令&quot;">​</a></h1><blockquote><p>git 图形化在线练习 <a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank" rel="noreferrer">https://learngitbranching.js.org/?locale=zh_CN</a></p></blockquote><h2 id="git-commit" tabindex="-1">git commit <a class="header-anchor" href="#git-commit" aria-label="Permalink to &quot;git commit&quot;">​</a></h2><p>用于提交本地代码到本地 git 仓库存储，可使用-m 表示说明</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git commit</span></span>
<span class="line"><span style="color:#E1E4E8;">git commit </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#9ECBFF;">&#39;demo&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git commit</span></span>
<span class="line"><span style="color:#24292E;">git commit </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#032F62;">&#39;demo&#39;</span></span></code></pre></div><h2 id="git-branch" tabindex="-1">git branch <a class="header-anchor" href="#git-branch" aria-label="Permalink to &quot;git branch&quot;">​</a></h2><p>用于新建分支</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git branch </span><span style="color:#9ECBFF;">&#39;branch&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git branch </span><span style="color:#032F62;">&#39;branch&#39;</span></span></code></pre></div><h2 id="git-checkout" tabindex="-1">git checkout <a class="header-anchor" href="#git-checkout" aria-label="Permalink to &quot;git checkout&quot;">​</a></h2><p>用于切换分支，也可用于新建并进入</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">git checkout </span><span style="color:#9ECBFF;">&#39;branch1&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 分支切换</span></span>
<span class="line"><span style="color:#E1E4E8;">git checkout </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">b </span><span style="color:#9ECBFF;">&#39;branch2&#39;</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 新建，并切换分支到branch2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">git checkout </span><span style="color:#032F62;">&#39;branch1&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 分支切换</span></span>
<span class="line"><span style="color:#24292E;">git checkout </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">b </span><span style="color:#032F62;">&#39;branch2&#39;</span><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 新建，并切换分支到branch2</span></span></code></pre></div><h2 id="git-merge" tabindex="-1">git merge <a class="header-anchor" href="#git-merge" aria-label="Permalink to &quot;git merge&quot;">​</a></h2><p>用于<strong>合并指定分支到目前所在的分支</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// *master  当前分支位于master，执行下面的命令可以让branch1合并到当前master下</span></span>
<span class="line"><span style="color:#E1E4E8;">git merge </span><span style="color:#9ECBFF;">&#39;branch1&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// *master  当前分支位于master，执行下面的命令可以让branch1合并到当前master下</span></span>
<span class="line"><span style="color:#24292E;">git merge </span><span style="color:#032F62;">&#39;branch1&#39;</span></span></code></pre></div>`,15),c=[o];function p(l,r,i,h,d,g){return s(),e("div",null,c)}const u=a(n,[["render",p]]);export{b as __pageData,u as default};
