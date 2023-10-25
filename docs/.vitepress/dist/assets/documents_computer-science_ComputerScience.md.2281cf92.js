import{_ as t,o as e,c as a,Q as d}from"./chunks/framework.4719a631.js";const o="/assets/image-20210706210750452.01ef3eaa.png",r="/assets/image-20210706213839515.654e9986.png",s="/assets/image-20210706212542659.3d9bec7a.png",i="/assets/image-20210706214038641.c9a2ce4d.png",l="/assets/image-20210706213639973.26c957b1.png",c="/assets/image-20210706213927146.96fc8144.png",p="/assets/image-20210706212030794.7910c34b.png",u="/assets/image-20210706214617036.8ac97a13.png",n="/assets/image-20210706221033518.93f3a00d.png",m="/assets/image-20210706221138014.af662c2a.png",h="/assets/image-20210706222707106.17687d23.png",b="/assets/image-20210706234647994.fcb76386.png",_="/assets/image-20210706234752492.6dd3975e.png",g="/assets/QQ20210707-191607@2x.e5ebe52d.png",q="/assets/519B9A259E65071D02B7E8AA37185131.60bf3de9.jpg",k="/assets/41421BF5937DC6A003EC3A49D99A9E3A.2a88f761.jpg",f="/assets/F26A21B8-8D6E-40B3-A015-982E6EB6F98D.60cac524.png",y="/assets/5992E5C46FBC593EB9A8F43002E3C306.f3efa27a.jpg",A="/assets/image-20210707200102226.f3c67991.png",T=JSON.parse('{"title":"Computer Science","description":"","frontmatter":{},"headers":[],"relativePath":"documents/computer-science/ComputerScience.md","filePath":"documents/computer-science/ComputerScience.md"}'),B={name:"documents/computer-science/ComputerScience.md"},x=d('<h1 id="computer-science" tabindex="-1">Computer Science <a class="header-anchor" href="#computer-science" aria-label="Permalink to &quot;Computer Science&quot;">​</a></h1><h1 id="_1-逻辑门" tabindex="-1">1 逻辑门 <a class="header-anchor" href="#_1-逻辑门" aria-label="Permalink to &quot;1 逻辑门&quot;">​</a></h1><blockquote><p>逻辑门<em>logic gate</em></p></blockquote><p>如下图，先了解下基本的三极管电路，再实现其他逻辑门；</p><blockquote><p>基本的三极管电路，由控制器控制电流的流向，按照布尔运算法则，当输入端 input 输入电流，设置为 true 状态，控制器打开，电流顺利流过，输出端 output 输出为 true，当 input 端控制器关闭为 false 状态，电流无法通过 output 形成断路，output 端无电流，为 false</p></blockquote><img src="'+o+'" alt="image-20210706210750452" style="zoom:25%;"><p>正常电路正常输出模式</p><table><thead><tr><th>input</th><th>output</th></tr></thead><tbody><tr><td>0 (false)</td><td>0 (false)</td></tr><tr><td>1 (true)</td><td>1 (true)</td></tr></tbody></table><h2 id="_1-1-与门" tabindex="-1">1.1 与门 <a class="header-anchor" href="#_1-1-与门" aria-label="Permalink to &quot;1.1 与门&quot;">​</a></h2><blockquote><p>与门 <em>and gate</em></p></blockquote><img src="'+r+'" alt="image-20210706213839515" style="zoom:25%;"><blockquote><p>很好理解，按照上面的电流图可知，我们可以设置一个<strong>串联</strong>电路，只有当其中两个支路均通畅时，才可保证电路正常运行，output 为 true，当其中任意一个电路为 false，电流断路，输入也为 false，即可实现与门的逻辑</p></blockquote><img src="'+s+'" alt="image-20210706212542659" style="zoom:25%;"><table><thead><tr><th>inputA</th><th>inputB</th><th>output</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table><h2 id="_1-2-或门" tabindex="-1">1.2 或门 <a class="header-anchor" href="#_1-2-或门" aria-label="Permalink to &quot;1.2 或门&quot;">​</a></h2><blockquote><p>或门 <em>or gate</em></p></blockquote><img src="'+i+'" alt="image-20210706214038641" style="zoom:25%;"><blockquote><p>或门逻辑类似与门，与门是两者同时满足才可，或门是满足一边即可，所以第一个想到的肯定就是并联电路</p></blockquote><img src="'+l+'" alt="image-20210706213639973" style="zoom:20%;"><table><thead><tr><th>inputA</th><th>inputB</th><th>output</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td></tr></tbody></table><h2 id="_1-3-非门" tabindex="-1">1.3 非门 <a class="header-anchor" href="#_1-3-非门" aria-label="Permalink to &quot;1.3 非门&quot;">​</a></h2><blockquote><p>非门 <em>not gate</em></p></blockquote><img src="'+c+'" alt="image-20210706213927146" style="zoom:25%;"><blockquote><p>非门的电流流向如下图所示，当 input 端输入为 false，a 支路断路堵死，电流会往 b 端流走，output 为 true</p><p>当 input 端输入为 true，电流直接通过 a 支路流向接地端，output 端无电流，为 false</p></blockquote><img src="'+p+'" alt="image-20210706212030794" style="zoom:20%;"><table><thead><tr><th>input</th><th>output</th></tr></thead><tbody><tr><td>1 (true)</td><td>0 (false)</td></tr><tr><td>0 (false)</td><td>1 (true)</td></tr></tbody></table><h2 id="_1-4-异或门" tabindex="-1">1.4 异或门 <a class="header-anchor" href="#_1-4-异或门" aria-label="Permalink to &quot;1.4 异或门&quot;">​</a></h2><blockquote><p>异或门 <em>exclusive or gate / Xor gate</em></p></blockquote><blockquote><p>异或门的逻辑和或门的逻辑有点类似，但是，异或门在输出端两端均为 true 的时候，输出端不是 true，而是 false</p><p>要实现如上逻辑，首先我们采用一个或门，实现其他的基本逻辑，再想办法解决两个 true 为 false 的问题，此时，令 ab 两个 input 端均为 true，两个 true 要输出一个 false，直接使用一个 and 串上一个 not 即可，实现了该功能后，最后将 or 门并上，并经过一个 and 门，即可实现</p></blockquote><img src="'+u+'" alt="image-20210706214617036" style="zoom:30%;"><table><thead><tr><th>inputA</th><th>inputB</th><th>output</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>0</td></tr></tbody></table><h1 id="_2-算术逻辑单元-alu" tabindex="-1">2 算术逻辑单元 ALU <a class="header-anchor" href="#_2-算术逻辑单元-alu" aria-label="Permalink to &quot;2 算术逻辑单元 ALU&quot;">​</a></h1><blockquote><p>算术逻辑单元 <em>Arithmetic and Logic Unit / ALU</em></p></blockquote><h2 id="_2-1-算术单元" tabindex="-1">2.1 算术单元 <a class="header-anchor" href="#_2-1-算术单元" aria-label="Permalink to &quot;2.1 算术单元&quot;">​</a></h2><blockquote><p>算术单元 <em>Arithmetic unit</em></p></blockquote><p>当我们拥有了逻辑门之后，如果要实现计算，那么，就需要用到计算机之中的算术逻辑单元进行辅助</p><h3 id="_2-1-1-半加器" tabindex="-1">2.1.1 半加器 <a class="header-anchor" href="#_2-1-1-半加器" aria-label="Permalink to &quot;2.1.1 半加器&quot;">​</a></h3><blockquote><p>半加器 <em>half adder</em></p></blockquote><p>思绪回归到小学时候学习两个数相加，我们会列出一个相加算式，按进位的方式帮助我们辅助计算，由此思路推及到二进制当中，就得出了半加器的概念</p><p>在正式介绍半加器之前，首先引出一个只有一 bite 的二进制加法，一位的二进制加法共有四种可能性，分别为</p><ul><li>0+0=0</li><li>0+1=1</li><li>1+0=1</li><li>1+1=10</li></ul><p>按照上面的描述，如果将其两个相加元素表示为输入端 ab，得到的求和结果表示为总和的输出端 sum 和进位 carry，那么将会得到如下逻辑表</p><table><thead><tr><th>inputA</th><th>inputB</th><th>carry(进位)</th><th>sum（总和）</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>0</td></tr></tbody></table><blockquote><p>其中，sum 位代表的是输入端的相加之后的二进制和，carry 位代表的是相加之后是否有进位的存在</p></blockquote><p>当我们忽略掉 carry 进位时，会发现，inputA，inputB 和 sum 组合而成的逻辑表实际上就是一个<strong>XOR 门</strong>，而忽略掉 sum 求和时，会发现，inputA，inputB 和 carry 组合而成的逻辑表是一个<strong>and 门</strong>，所以很好理解了，只要使用一个异或门，一个与门，输入两个值的时候就可以得到两个输出值，分别对应进位和总和，这就是一个<strong>半加器</strong></p><img src="'+n+'" alt="image-20210706221033518" style="zoom:20%;"><p>半加器可以抽象表示为如下图所示的内容，两个输入端，两个输出端</p><img src="'+m+'" alt="image-20210706221138014" style="zoom:20%;"><h3 id="_2-1-2-全加器" tabindex="-1">2.1.2 全加器 <a class="header-anchor" href="#_2-1-2-全加器" aria-label="Permalink to &quot;2.1.2 全加器&quot;">​</a></h3><blockquote><p>全加器 <em>Full adder</em></p></blockquote><p>有了上面的半加器，会发现一个问题，那就是实际上我们在计算二进制的时候，我们的输入端不止两个数，而是三位数！</p><img src="'+h+'" alt="image-20210706222707106" style="zoom:30%;"><p>如上图所示，当计算二进制加法的时候，<strong>除了最后一位</strong>（即类似十进制加法中的个位加法中）我们不需要考虑进位之外，其他每一列都需要考虑输入端的两位数 ab 和进位 carry 的存在，于是，可以得到如下逻辑表，左边三格为当前位数上的三个值，右边两格的第一格 carry 是需要传递给左边的进位的进位值，sum 是两个 input 的相加值</p><table><thead><tr><th>inputA</th><th>inputB</th><th>carry(从上一位继承的进位值)</th><th>carry（传递给下一位的进位值）</th><th>sum</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td><td></td><td>0</td></tr><tr><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr></tbody></table><p>利用两个半加器，就可以实现上述的逻辑表格</p><p>使用第一个半加器，输入 inputA, inputB 我们可以得到一个 sum 求和值和一个 carry 进位值（传递给下一位），然后，取出从上一位继承而来的 carry 值，和 sum 值进行二次半加器运算，得出来的 sum 值就是最终的 sum 值，即最后一位（类似三个数相加的算式，前两个分别是 inputA 和 inputB，第三个数是进位，三个数加一起的 sum 就是最后一位），然后只要其中 inputA+inputB 有进位，或者 sum 和继承的 carry 有进位，那么进位就为 1，得出全加器的图，如下</p><img src="'+b+'" alt="image-20210706234647994" style="zoom:30%;"><p>如此，便得出了一个全加器，拥有三个输入，即当前位的两个值 inputA 和 inputB，已经从上一次运算中获取到的 carry 值，输出一个当前位置上的 sum 值以及传递给下一位用于计算的 carry 值</p><img src="'+_+'" alt="image-20210706234752492" style="zoom:50%;"><h3 id="_2-1-3-8-位加法器" tabindex="-1">2.1.3 8 位加法器 <a class="header-anchor" href="#_2-1-3-8-位加法器" aria-label="Permalink to &quot;2.1.3 8 位加法器&quot;">​</a></h3><blockquote><p>8 位加法器 <em>8-bit adder</em> / 脉动进位加法器</p></blockquote><p>8 位加法器，即计算两个八位二进制数的加法的工具，按照 2.1.1 和 2.1.2 中的两个加法器，可以推出：</p><blockquote><p>最后一位的加法可以用半加器实现，其余各位的加法均需考虑上一位产生的进位，故需要用到全加器，所以一个半加器组合七个全加器便可以得到 8 位加法器的实现图</p></blockquote><img src="'+g+'" alt="QQ20210707-191607@2x" style="zoom:70%;"><p>如此，便得到了 8 位加法器。</p><p><strong>注意！<strong>最后一位可能会产生一个进位，但是已经没有新的全加器用于接收，此时造成的结果就是</strong>溢出（overflow）</strong></p><h2 id="_2-2-逻辑单元" tabindex="-1">2.2 逻辑单元 <a class="header-anchor" href="#_2-2-逻辑单元" aria-label="Permalink to &quot;2.2 逻辑单元&quot;">​</a></h2><h2 id="_2-3-alu" tabindex="-1">2.3 ALU <a class="header-anchor" href="#_2-3-alu" aria-label="Permalink to &quot;2.3 ALU&quot;">​</a></h2><p>经过上面所述的 8 位加法器，我们可以获得到 ALU 的一层抽象概念</p><img src="'+q+'" alt="519B9A259E65071D02B7E8AA37185131" style="zoom:25%;"><p>上图中，拥有两个输入，inputA 和 inputB，其中，左侧的四位 operation code 代表操作码，告诉 ALU 是要进行加减乘除中的哪一个，最后输出一个结果，同时，输出一些值为 0 或 1 的 flag，用于检测是否溢出，是否为 0 以及是否为负</p><h1 id="_3-寄存器-内存" tabindex="-1">3 寄存器&amp;内存 <a class="header-anchor" href="#_3-寄存器-内存" aria-label="Permalink to &quot;3 寄存器&amp;内存&quot;">​</a></h1><h2 id="_3-1-存储-1-和-0-的状态" tabindex="-1">3.1 存储 1 和 0 的状态 <a class="header-anchor" href="#_3-1-存储-1-和-0-的状态" aria-label="Permalink to &quot;3.1 存储 1 和 0 的状态&quot;">​</a></h2><h3 id="_3-1-1-存储-1" tabindex="-1">3.1.1 存储 1 <a class="header-anchor" href="#_3-1-1-存储-1" aria-label="Permalink to &quot;3.1.1 存储 1&quot;">​</a></h3><p>要令计算机记住一个数，只需要将 or 门的输出端，接入到输入端的一端，此时，只要 A 端流入电流变成 1，那么 b 端会因为回流的关系也变成 1，而此时，无论当 a 端怎么改，b 端始终为 1，不变了，形成永久性存储，这便记住了 1</p><img src="'+k+'" alt="41421BF5937DC6A003EC3A49D99A9E3A" style="zoom:25%;"><h3 id="_3-1-2-存储-0" tabindex="-1">3.1.2 存储 0 <a class="header-anchor" href="#_3-1-2-存储-0" aria-label="Permalink to &quot;3.1.2 存储 0&quot;">​</a></h3><p>与存储 1 的方式类似，只需要将逻辑 or 门改成逻辑 and 门，当 A 端流入 1，B 端也因回流变成 1，当 a 端流入 0 时，因为 and 门特性，b 端变成 0，而且，无论 a 端如何变化，此时的输出都将会是 0，这便记住了 0</p><img src="'+f+'" alt="F26A21B8-8D6E-40B3-A015-982E6EB6F98D" style="zoom:25%;"><h2 id="_3-2-锁存器" tabindex="-1">3.2 锁存器 <a class="header-anchor" href="#_3-2-锁存器" aria-label="Permalink to &quot;3.2 锁存器&quot;">​</a></h2><p>根据存 1 和存 0 的电路，可以得出锁存器的原理图，锁存器有两个输入端，set 位和 reset 位</p><p>reset=0，即不启用重置功能，此时所存的循环便是 set 的输入</p><p>reset=1，启用重置功能，无论 set 是何值，循环都将初始化为 0</p><img src="'+y+'" alt="5992E5C46FBC593EB9A8F43002E3C306" style="zoom:25%;"><h2 id="_3-3-门锁" tabindex="-1">3.3 门锁 <a class="header-anchor" href="#_3-3-门锁" aria-label="Permalink to &quot;3.3 门锁&quot;">​</a></h2><blockquote><p>门锁 <em>gated latch</em></p></blockquote><p>因为锁存器需要两个位置比较复杂，故而加入更多逻辑门，形成两条线，一条是数据写入线，输入 1 或 0 用于存储，一条允许写入线，用于是否允许该输入的数据进行存储</p><img src="'+A+'" alt="image-20210707200102226" style="zoom:25%;">',88),P=[x];function E(z,C,D,S,F,L){return e(),a("div",null,P)}const Q=t(B,[["render",E]]);export{T as __pageData,Q as default};
