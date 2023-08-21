"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const v=require("@pixi/display"),C=require("@pixi/app"),y=require("@pixi/filter-blur"),w=require("@pixi/filter-color-matrix"),M=require("@pixi/core"),b=require("@pixi/sprite"),z=require("jss"),A=require("jss-preset-default"),D=/^(((?<hour>[0-9]+):)?(?<min>[0-9]+):)?(?<sec>[0-9]+([\.:]([0-9]+))?)/;function L(c){const e=D.exec(c);if(e){const t=Number(e.groups?.hour||"0"),i=Number(e.groups?.min||"0"),r=Number(e.groups?.sec.replace(/:/,".")||"0");return Math.floor((t*3600+i*60+r)*1e3)}else throw new TypeError("时间戳字符串解析失败")}function B(c){const t=new DOMParser().parseFromString(c,"application/xml");let i="v1";for(const n of t.querySelectorAll("ttm\\:agent"))if(n.getAttribute("type")==="person"){const s=n.getAttribute("xml:id");s&&(i=s)}const r=[];for(const n of t.querySelectorAll("body p[begin][end]")){const s={words:[],startTime:L(n.getAttribute("begin")??"0:0"),endTime:L(n.getAttribute("end")??"0:0"),translatedLyric:"",romanLyric:"",isBG:!1,isDuet:n.getAttribute("ttm:agent")!==i};let a=null;for(const l of n.childNodes)if(l.nodeType===Node.TEXT_NODE){const o=l.textContent??"";/^(\s+)$/.test(o)?s.words.push({word:" ",startTime:0,endTime:0}):s.words.push({word:o,startTime:0,endTime:0})}else if(l.nodeType===Node.ELEMENT_NODE){const o=l,m=o.getAttribute("ttm:role");if(o.nodeName==="span"&&m)if(m==="x-bg"){const h={words:[],startTime:s.startTime,endTime:s.endTime,translatedLyric:"",romanLyric:"",isBG:!0,isDuet:s.isDuet};for(const p of o.childNodes)if(p.nodeType===Node.TEXT_NODE){const u=p.textContent??"";/^(\s+)$/.test(u)?h.words.push({word:" ",startTime:0,endTime:0}):h.words.push({word:u,startTime:0,endTime:0})}else if(p.nodeType===Node.ELEMENT_NODE){const u=p,S=u.getAttribute("ttm:role");if(u.nodeName==="span"&&S)S==="x-translation"?h.translatedLyric=u.innerHTML.trim():S==="x-roman"&&(h.romanLyric=u.innerHTML.trim());else if(u.hasAttribute("begin")&&u.hasAttribute("end")){const x={word:p.textContent,startTime:L(u.getAttribute("begin")),endTime:L(u.getAttribute("end"))};h.words.push(x)}}const d=h.words[0];h.startTime=d.startTime,d?.word.startsWith("(")&&(d.word=d.word.substring(1));const f=h.words[h.words.length-1];h.endTime=f.endTime,f?.word.endsWith(")")&&(f.word=f.word.substring(0,f.word.length-1)),a=h}else m==="x-translation"?s.translatedLyric=o.innerHTML:m==="x-roman"&&(s.romanLyric=o.innerHTML);else if(o.hasAttribute("begin")&&o.hasAttribute("end")){const h={word:l.textContent??"",startTime:L(o.getAttribute("begin")),endTime:L(o.getAttribute("end"))};s.words.push(h)}}r.push(s),a&&r.push(a)}return r}const I=Object.freeze(Object.defineProperty({__proto__:null,parseTTML:B},Symbol.toStringTag,{value:"Module"}));class k extends v.Container{time=0}class F{constructor(e){this.canvas=e;const t=e.getBoundingClientRect();this.canvas.width=t.width*this.currerntRenderScale,this.canvas.height=t.height*this.currerntRenderScale,this.observer=new ResizeObserver(()=>{const i=e.getBoundingClientRect();this.canvas.width=Math.max(1,i.width),this.canvas.height=Math.max(1,i.height),this.app.renderer.resize(this.canvas.width*this.currerntRenderScale,this.canvas.height*this.currerntRenderScale),this.app.ticker.start(),this.rebuildFilters()}),this.observer.observe(e),this.app=new C.Application({view:e,resizeTo:this.canvas,powerPreference:"low-power",backgroundAlpha:0}),this.rebuildFilters(),this.app.ticker.add(this.onTick),this.app.ticker.start()}observer;app;curContainer;staticMode=!1;lastContainer=new Set;onTick=e=>{for(const t of this.lastContainer)t.alpha=Math.max(0,t.alpha-e/60),t.alpha<=0&&(this.app.stage.removeChild(t),this.lastContainer.delete(t));if(this.curContainer){this.curContainer.alpha=Math.min(1,this.curContainer.alpha+e/60);const[t,i,r,n]=this.curContainer.children,s=Math.max(this.app.screen.width,this.app.screen.height);t.position.set(this.app.screen.width/2,this.app.screen.height/2),i.position.set(this.app.screen.width/2.5,this.app.screen.height/2.5),r.position.set(this.app.screen.width/2,this.app.screen.height/2),n.position.set(this.app.screen.width/2,this.app.screen.height/2),t.width=s*Math.sqrt(2),t.height=t.width,i.width=s*.8,i.height=i.width,r.width=s*.5,r.height=r.width,n.width=s*.25,n.height=n.width,this.curContainer.time+=e*this.flowSpeed,t.rotation+=e/1e3*this.flowSpeed,i.rotation-=e/500*this.flowSpeed,r.rotation+=e/1e3*this.flowSpeed,n.rotation-=e/750*this.flowSpeed,r.x=this.app.screen.width/2+this.app.screen.width/4*Math.cos(this.curContainer.time/1e3*.75),r.y=this.app.screen.height/2+this.app.screen.width/4*Math.cos(this.curContainer.time/1e3*.75),n.x=this.app.screen.width/2+this.app.screen.width/4*.1+Math.cos(this.curContainer.time*.006*.75),n.y=this.app.screen.height/2+this.app.screen.width/4*.1+Math.cos(this.curContainer.time*.006*.75),this.curContainer.alpha>=1&&this.lastContainer.size===0&&this.staticMode&&this.app.ticker.stop()}};flowSpeed=2;currerntRenderScale=.75;setFlowSpeed(e){this.flowSpeed=e}setRenderScale(e){this.currerntRenderScale=e;const t=this.canvas.getBoundingClientRect();this.canvas.width=Math.max(1,t.width),this.canvas.height=Math.max(1,t.height),this.app.renderer.resize(this.canvas.width*this.currerntRenderScale,this.canvas.height*this.currerntRenderScale),this.rebuildFilters()}rebuildFilters(){const e=Math.min(this.canvas.width,this.canvas.height),t=new w.ColorMatrixFilter;t.saturate(1.2,!1);const i=new w.ColorMatrixFilter;i.brightness(.6,!1);const r=new w.ColorMatrixFilter;r.contrast(.3,!0),this.app.stage.filters=[],this.app.stage.filters.push(new y.BlurFilter(5,1)),this.app.stage.filters.push(new y.BlurFilter(10,1)),this.app.stage.filters.push(new y.BlurFilter(20,2)),this.app.stage.filters.push(new y.BlurFilter(40,2)),e>512&&this.app.stage.filters.push(new y.BlurFilter(80,2)),e>768&&this.app.stage.filters.push(new y.BlurFilter(160,4)),e>768*2&&this.app.stage.filters.push(new y.BlurFilter(320,4)),this.app.stage.filters.push(t,i,r),this.app.stage.filters.push(new y.BlurFilter(5,1))}setStaticMode(e=!1){this.staticMode=e,this.app.ticker.start()}setFPS(e){this.app.ticker.maxFPS=e}pause(){this.app.ticker.stop(),this.app.render()}resume(){this.app.ticker.start()}async setAlbumImage(e){const t=await M.Texture.fromURL(e),i=new k,r=new b.Sprite(t),n=new b.Sprite(t),s=new b.Sprite(t),a=new b.Sprite(t);r.anchor.set(.5,.5),n.anchor.set(.5,.5),s.anchor.set(.5,.5),a.anchor.set(.5,.5),r.rotation=Math.random()*Math.PI*2,n.rotation=Math.random()*Math.PI*2,s.rotation=Math.random()*Math.PI*2,a.rotation=Math.random()*Math.PI*2,i.addChild(r,n,s,a),this.curContainer&&this.lastContainer.add(this.curContainer),this.curContainer=i,this.app.stage.addChild(this.curContainer),this.curContainer.alpha=0,this.app.ticker.start()}dispose(){this.observer.disconnect(),this.app.ticker.remove(this.onTick)}}class O extends F{element;constructor(){const e=document.createElement("canvas");super(e),this.element=e,e.style.pointerEvents="none",e.style.zIndex="-1"}getElement(){return this.element}dispose(){super.dispose(),this.element.remove()}}const q=(c,e)=>c.size===e.size&&[...c].every(t=>e.has(t));class T{currentPosition=0;targetPosition=0;currentTime=0;params={};currentSolver;getV;queueParams;queuePosition;constructor(e=0){this.targetPosition=e,this.currentPosition=this.targetPosition,this.currentSolver=()=>this.targetPosition,this.getV=()=>0}resetSolver(){const e=this.getV(this.currentTime);this.currentTime=0,this.currentSolver=N(this.currentPosition,e,this.targetPosition,0,this.params),this.getV=_(this.currentSolver)}arrived(){return Math.abs(this.targetPosition-this.currentPosition)<.01&&this.getV(this.currentTime)<.01&&this.queueParams===void 0&&this.queuePosition===void 0}setPosition(e){this.targetPosition=e,this.currentPosition=e,this.currentSolver=()=>this.targetPosition,this.getV=()=>0}update(e=0){this.currentTime+=e,this.currentPosition=this.currentSolver(this.currentTime),this.queueParams&&(this.queueParams.time-=e,this.queueParams.time<=0&&this.updateParams({...this.queueParams})),this.queuePosition&&(this.queuePosition.time-=e,this.queuePosition.time<=0&&this.setTargetPosition(this.queuePosition.position)),this.arrived()&&this.setPosition(this.targetPosition)}updateParams(e,t=0){t>0?this.queueParams={...e,time:t}:(this.params={...this.params,...e},this.resetSolver())}setTargetPosition(e,t=0){t>0?this.queuePosition={position:e,time:t}:(this.queuePosition=void 0,this.targetPosition=e,this.resetSolver())}getCurrentPosition(){return this.currentPosition}}function N(c,e,t,i=0,r){const n=r?.soft??!1,s=r?.stiffness??100,a=r?.damping??10,l=r?.mass??1,o=t-c;if(n||1<=a/(2*Math.sqrt(s*l))){const m=-Math.sqrt(s/l),h=-m*o-e;return d=>(d-=i,d<0?c:t-(o+d*h)*Math.E**(d*m))}else{const m=Math.sqrt(4*l*s-a**2),h=(a*o-2*l*e)/m,d=.5*m/l,f=-(.5*a)/l;return p=>(p-=i,p<0?c:t-(Math.cos(p*d)*o+Math.sin(p*d)*h)*Math.E**(p*f))}}function $(c){return t=>(c(t+.001)-c(t-.001))/(2*.001)}function _(c){return $(c)}class R{constructor(e){this.lyricPlayer=e,this.element.setAttribute("class",this.lyricPlayer.style.classes.lyricLine),this.rebuildStyle()}element=document.createElement("div");left=0;top=0;delay=0;lineSize=[0,0];lineTransforms={posX:new T(0),posY:new T(0)};measureSize(){return[this.element.clientWidth,this.element.clientHeight]}lastStyle="";show(){this.rebuildStyle()}hide(){this.rebuildStyle()}rebuildStyle(){let e=`transform:translate(${this.lineTransforms.posX.getCurrentPosition()}px,${this.lineTransforms.posY.getCurrentPosition()}px);`;!this.lyricPlayer.getEnableSpring()&&this.isInSight&&(e+=`transition-delay:${this.delay}ms;`),e!==this.lastStyle&&(this.lastStyle=e,this.element.setAttribute("style",e))}getElement(){return this.element}setTransform(e=this.left,t=this.top,i=!1,r=0){this.left=e,this.top=t,this.delay=r*1e3|0,i||!this.lyricPlayer.getEnableSpring()?(i&&this.element.classList.add(this.lyricPlayer.style.classes.tmpDisableTransition),this.lineTransforms.posX.setPosition(e),this.lineTransforms.posY.setPosition(t),this.lyricPlayer.getEnableSpring()?this.rebuildStyle():this.show(),i&&requestAnimationFrame(()=>{this.element.classList.remove(this.lyricPlayer.style.classes.tmpDisableTransition)})):(this.lineTransforms.posX.setTargetPosition(e,r),this.lineTransforms.posY.setTargetPosition(t,r))}update(e=0){this.lyricPlayer.getEnableSpring()&&(this.lineTransforms.posX.update(e),this.lineTransforms.posY.update(e),this.isInSight?this.show():this.hide())}get isInSight(){const e=this.lineTransforms.posX.getCurrentPosition(),t=this.lineTransforms.posY.getCurrentPosition(),i=e+this.lineSize[0],r=t+this.lineSize[1],n=this.lyricPlayer.pos[0],s=this.lyricPlayer.pos[1],a=this.lyricPlayer.pos[0]+this.lyricPlayer.size[0],l=this.lyricPlayer.pos[1]+this.lyricPlayer.size[1];return!(e>a||t>l||i<n||r<s)}dispose(){this.element.remove()}}function X(c){const t=2.5949095;return c<.5?Math.pow(2*c,2)*((t+1)*2*c-t)/2:(Math.pow(2*c-2,2)*((t+1)*(c*2-2)+t)+2)/2}const g=(c,e,t)=>Math.max(c,Math.min(e,t));class W{constructor(e){this.lyricPlayer=e,this.element.className=this.lyricPlayer.style.classes.interludeDots,this.element.appendChild(this.dot0),this.element.appendChild(this.dot1),this.element.appendChild(this.dot2)}element=document.createElement("div");dot0=document.createElement("span");dot1=document.createElement("span");dot2=document.createElement("span");left=0;top=0;scale=1;lastStyle="";currentInterlude;currentTime=0;targetBreatheDuration=1500;getElement(){return this.element}setTransform(e=this.left,t=this.top){this.left=e,this.top=t,this.update()}setInterlude(e){this.currentInterlude=e,this.currentTime=e?.[0]??0}update(e=0){this.currentTime+=e;let t="";if(t+=`transform:translate(${this.left}px, ${this.top}px)`,this.currentInterlude){const i=this.currentInterlude[1]-this.currentInterlude[0],r=this.currentTime-this.currentInterlude[0];if(r<=i){const n=i/Math.ceil(i/this.targetBreatheDuration);let s=1,a=1;s*=Math.sin(1.5*Math.PI-r/n*2)/10+1,r<1e3&&(s*=1-Math.pow((1e3-r)/1e3,2)),r<500?a=0:r<1e3&&(a*=(r-500)/500),i-r<750&&(s*=1-X((750-(i-r))/750/2)),i-r<375&&(a*=g(0,(i-r)/375,1)),s=Math.max(0,s),t+=` scale(${s})`;const l=g(.25,r*3/i*.75,1),o=g(.25,(r-i/3)*3/i*.75,1),m=g(.25,(r-i/3*2)*3/i*.75,1);this.dot0.style.opacity=`${g(0,Math.max(0,a*l),1)}`,this.dot1.style.opacity=`${g(0,Math.max(0,a*o),1)}`,this.dot2.style.opacity=`${g(0,Math.max(0,a*m),1)}`}else t+=" scale(0)",this.dot0.style.opacity="0",this.dot1.style.opacity="0",this.dot2.style.opacity="0"}else t+=" scale(0)",this.dot0.style.opacity="0",this.dot1.style.opacity="0",this.dot2.style.opacity="0";t+=";",this.lastStyle!==t&&(this.element.setAttribute("style",t),this.lastStyle=t)}dispose(){this.element.remove()}}const E=/^[\p{Unified_Ideograph}\u0800-\u9FFC]+$/u;function Y(c,e="rgba(0,0,0,1)",t="rgba(0,0,0,0.5)"){const i=2+c,r=c/i,n=(1-r)/2;return[`linear-gradient(to right,${e} ${n*100}%,${t} ${(n+r)*100}%)`,r,i]}function P(c){return c.endTime-c.startTime>=1e3&&c.word.length<=7}class G{constructor(e,t={words:[],translatedLyric:"",romanLyric:"",startTime:0,endTime:0,isBG:!1,isDuet:!1}){this.lyricPlayer=e,this.lyricLine=t,this.element.setAttribute("class",this.lyricPlayer.style.classes.lyricLine),this.lyricLine.isBG&&this.element.classList.add(this.lyricPlayer.style.classes.lyricBgLine),this.lyricLine.isDuet&&this.element.classList.add(this.lyricPlayer.style.classes.lyricDuetLine),this.element.appendChild(document.createElement("div")),this.element.appendChild(document.createElement("div")),this.element.appendChild(document.createElement("div"));const i=this.element.children[0],r=this.element.children[1],n=this.element.children[2];i.setAttribute("class",this.lyricPlayer.style.classes.lyricMainLine),r.setAttribute("class",this.lyricPlayer.style.classes.lyricSubLine),n.setAttribute("class",this.lyricPlayer.style.classes.lyricSubLine),this.rebuildElement(),this.rebuildStyle()}element=document.createElement("div");left=0;top=0;scale=1;blur=0;delay=0;splittedWords=[];lineSize=[0,0];lineTransforms={posX:new T(0),posY:new T(0),scale:new T(1)};isEnabled=!1;enable(){this.isEnabled=!0,this.element.classList.add("active");const e=this.element.children[0];this.splittedWords.forEach(t=>{t.elementAnimations.forEach(i=>{i.currentTime=0,i.playbackRate=1,i.play()})}),e.classList.add("active")}measureSize(){this._hide&&(this.element.style.display="",this.element.style.visibility="hidden");const e=[this.element.clientWidth,this.element.clientHeight];return this._hide&&(this.element.style.display="none",this.element.style.visibility=""),e}disable(){this.isEnabled=!1,this.element.classList.remove("active");const e=this.element.children[0];this.splittedWords.forEach(t=>{t.elementAnimations.forEach(i=>{i.id==="float-word"&&(i.playbackRate=-1,i.play())})}),e.classList.remove("active")}setLine(e){this.lyricLine=e,this.lyricLine.isBG?this.element.classList.add(this.lyricPlayer.style.classes.lyricBgLine):this.element.classList.remove(this.lyricPlayer.style.classes.lyricBgLine),this.lyricLine.isDuet?this.element.classList.add(this.lyricPlayer.style.classes.lyricDuetLine):this.element.classList.remove(this.lyricPlayer.style.classes.lyricDuetLine),this.rebuildElement(),this.rebuildStyle()}getLine(){return this.lyricLine}_hide=!0;lastStyle="";show(){this._hide=!1,this.rebuildStyle()}hide(){this._hide=!0,this.rebuildStyle()}rebuildStyle(){if(this._hide){this.lastStyle!=="display:none;transform:translate(0,-10000px);"&&(this.lastStyle="display:none;transform:translate(0,-10000px);",this.element.setAttribute("style","display:none;transform:translate(0,-10000px);"));return}let e=`transform:translate(${this.lineTransforms.posX.getCurrentPosition()}px,${this.lineTransforms.posY.getCurrentPosition()}px) scale(${this.lineTransforms.scale.getCurrentPosition()});`;!this.lyricPlayer.getEnableSpring()&&this.isInSight&&(e+=`transition-delay:${this.delay}ms;`),e+=`filter:blur(${Math.min(32,this.blur)}px);`,e!==this.lastStyle&&(this.lastStyle=e,this.element.setAttribute("style",e))}rebuildElement(){const e=this.element.children[0],t=this.element.children[1],i=this.element.children[2];if(this.lyricPlayer._getIsNonDynamic()){for(;e.firstChild;)e.removeChild(e.firstChild),s(e.firstChild);e.innerText=this.lyricLine.words.map(l=>l.word).join(""),t.innerText=this.lyricLine.translatedLyric,i.innerText=this.lyricLine.romanLyric;return}this.splittedWords=[],this.lyricLine.words.forEach(l=>{const o=l.word.split(/\s+/),m=o.reduce((d,f)=>d+f.length,0);let h=0;o.forEach((d,f)=>{f>0&&this.splittedWords.push({word:" ",startTime:0,endTime:0,width:0,height:0,elements:[],elementAnimations:[],shouldEmphasize:!1}),this.splittedWords.push({word:d,startTime:l.startTime+(l.endTime-l.startTime)/m*h,endTime:l.startTime+(l.endTime-l.startTime)/m*(h+d.length),width:0,height:0,elements:[],elementAnimations:[],shouldEmphasize:P(l)}),h+=d.length})});const r=[],n=[];function s(l){for(;l.firstChild;)l.firstChild.nodeType===Node.ELEMENT_NODE?r.push(e.firstChild):l.firstChild.nodeType===Node.TEXT_NODE&&n.push(e.firstChild),l.removeChild(l.firstChild),s(l.firstChild)}s(e);let a=null;this.splittedWords.forEach(l=>{if(l.word.trim().length>0)if(l.shouldEmphasize){const o=r.pop()??document.createElement("span");o.className="emphasize",l.elements=[o];for(const m of l.word){const h=r.pop()??document.createElement("span");h.className="",h.innerText=m,o.appendChild(h),l.elements.push(h)}if(l.elementAnimations=this.initEmphasizeAnimation(l),a&&!E.test(l.word))if(a.childElementCount>0)a.appendChild(o);else{const m=r.pop()??document.createElement("span");m.className="",a.remove(),m.appendChild(a),m.appendChild(o),e.appendChild(m),a=m}else a=E.test(l.word)?null:o,e.appendChild(o)}else{const o=r.pop()??document.createElement("span");if(o.className="",o.innerText=l.word,l.elements=[o],l.elementAnimations.push(this.initFloatAnimation(l,o)),a)if(a.childElementCount>0)a.appendChild(o);else{const m=r.pop()??document.createElement("span");m.className="",a.remove(),m.appendChild(a),m.appendChild(o),e.appendChild(m),a=m}else a=o,e.appendChild(o)}else if(l.word.length>0){const o=n.pop()??document.createTextNode(" ");e.appendChild(o),a=null}else a=null}),t.innerText=this.lyricLine.translatedLyric,i.innerText=this.lyricLine.romanLyric}initFloatAnimation(e,t){const i=e.startTime-this.lyricLine.startTime,r=Math.max(1e3,e.endTime-e.startTime),n=t.animate([{transform:"translateY(0px)"},{transform:"translateY(-3%)"}],{duration:isFinite(r)?r:0,delay:isFinite(i)?i:0,id:"float-word",composite:"add",fill:"both"});return n.pause(),n}initEmphasizeAnimation(e){const t=e.startTime-this.lyricLine.startTime,i=e.endTime-e.startTime;return e.elements.map((r,n,s)=>{if(n===0)return this.initFloatAnimation(e,r);{const a=Math.max(1e3,e.endTime-e.startTime),l=t+i/(s.length-1)*(n-1),o=r.animate([{offset:0,transform:"translate3d(0, 0px, 0px)",filter:"drop-shadow(0 0 0 var(--amll-lyric-view-color,white))"},{offset:.5,transform:"translate3d(0, -2%, 20px)",filter:"drop-shadow(0 0 0.2rem var(--amll-lyric-view-color,white))"},{offset:1,transform:"translate3d(0, 0px, 0)",filter:"drop-shadow(0 0 0 var(--amll-lyric-view-color,white))"}],{duration:isFinite(a)?a:0,delay:isFinite(l)?l:0,id:"glow-word",iterations:1,composite:"replace",fill:"both"});return o.pause(),o}})}updateMaskImage(){this._hide&&(this.element.style.display="",this.element.style.visibility="hidden"),this.splittedWords.forEach(e=>{const t=e.elements[0];if(t){e.width=t.clientWidth,e.height=t.clientHeight;const[i,r,n]=Y(16/e.width,"rgba(0,0,0,0.75)","rgba(0,0,0,0.25)"),s=`${n*100}% 100%`;this.lyricPlayer.supportMaskImage?(t.style.maskImage=i,t.style.maskOrigin="left",t.style.maskSize=s):(t.style.webkitMaskImage=i,t.style.webkitMaskOrigin="left",t.style.webkitMaskSize=s);const a=e.width+16,l=`clamp(${-a}px,calc(${-a}px + (var(--amll-player-time) - ${e.startTime})*${a/Math.abs(e.endTime-e.startTime)}px),0px) 0px, left top`;t.style.maskPosition=l,t.style.webkitMaskPosition=l}}),this._hide&&(this.element.style.display="none",this.element.style.visibility="")}getElement(){return this.element}setTransform(e=this.left,t=this.top,i=this.scale,r=1,n=0,s=!1,a=0){this.left=e,this.top=t,this.scale=i,this.delay=a*1e3|0;const l=this.element.children[0];l.style.opacity=`${r}`,s||!this.lyricPlayer.getEnableSpring()?(this.blur=Math.min(32,n),s&&this.element.classList.add(this.lyricPlayer.style.classes.tmpDisableTransition),this.lineTransforms.posX.setPosition(e),this.lineTransforms.posY.setPosition(t),this.lineTransforms.scale.setPosition(i),this.lyricPlayer.getEnableSpring()?this.rebuildStyle():this.show(),s&&requestAnimationFrame(()=>{this.element.classList.remove(this.lyricPlayer.style.classes.tmpDisableTransition)})):(this.lineTransforms.posX.setTargetPosition(e,a),this.lineTransforms.posY.setTargetPosition(t,a),this.lineTransforms.scale.setTargetPosition(i),this.blur!==Math.min(32,n)&&(this.blur=Math.min(32,n),this.element.style.filter=`blur(${Math.min(32,n)}px)`))}update(e=0){this.lyricPlayer.getEnableSpring()&&(this.lineTransforms.posX.update(e),this.lineTransforms.posY.update(e),this.lineTransforms.scale.update(e),this.isInSight?this.show():this.hide())}get isInSight(){const e=this.lineTransforms.posX.getCurrentPosition(),t=this.lineTransforms.posY.getCurrentPosition(),i=e+this.lineSize[0],r=t+this.lineSize[1],n=this.lyricPlayer.pos[0],s=this.lyricPlayer.pos[1],a=this.lyricPlayer.pos[0]+this.lyricPlayer.size[0],l=this.lyricPlayer.pos[1]+this.lyricPlayer.size[1];return!(e>a||t>l||i<n||r<s)}dispose(){this.element.remove()}}const V=z.create(A());class j extends EventTarget{element=document.createElement("div");currentTime=0;lyricLines=[];processedLines=[];lyricLinesEl=[];lyricLinesSize=new Map;hotLines=new Set;bufferedLines=new Set;scrollToIndex=0;allowScroll=!0;scrolledHandler=0;isScrolled=!1;invokedByScrollEvent=!1;scrollOffset=0;resizeObserver=new ResizeObserver(e=>{const t=e[0].contentRect;this.size[0]=t.width,this.size[1]=t.height,this.pos[0]=t.left,this.pos[1]=t.top;const i=getComputedStyle(e[0].target),r=this.element.clientWidth-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight),n=this.element.clientHeight-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom);this.innerSize[0]=r,this.innerSize[1]=n,this.rebuildStyle(),this.calcLayout(!0,!0),this.lyricLinesEl.forEach(s=>s.updateMaskImage())});posXSpringParams={mass:1,damping:10,stiffness:100};posYSpringParams={mass:1,damping:15,stiffness:100};scaleSpringParams={mass:1,damping:20,stiffness:100};enableBlur=!0;interludeDots;interludeDotsSize=[0,0];bottomLine;supportPlusLighter=CSS.supports("mix-blend-mode","plus-lighter");supportMaskImage=CSS.supports("mask-image","none");disableSpring=!1;alignAnchor=.5;isNonDynamic=!1;size=[0,0];innerSize=[0,0];pos=[0,0];_getIsNonDynamic(){return this.isNonDynamic}setEnableSpring(e=!0){this.disableSpring=!e,e?this.element.classList.remove(this.style.classes.disableSpring):this.element.classList.add(this.style.classes.disableSpring),this.calcLayout(!0)}getEnableSpring(){return!this.disableSpring}style=V.createStyleSheet({lyricPlayer:{userSelect:"none",fontSize:"var(--amll-lyric-player-font-size,max(5vh, 12px))",padding:"1rem",width:"100%",height:"100%",overflow:"hidden",maxWidth:"100%",maxHeight:"100%",zIndex:1,color:"var(--amll-lyric-view-color,white)",mixBlendMode:"plus-lighter",contain:"strict",boxSizing:"border-box"},lyricLine:{position:"absolute",transformOrigin:"left",maxWidth:"var(--amll-lyric-player-width,100%)",minWidth:"var(--amll-lyric-player-width,100%)",width:"var(--amll-lyric-player-width,100%)",padding:"max(2vh, 1rem) 1rem",contain:"content",willChange:"filter,transform,opacity",transition:"filter 0.25s",boxSizing:"border-box"},"@media (max-width: 1024px)":{lyricLine:{padding:"max(1vh, 1rem) 0"}},lyricDuetLine:{textAlign:"right",transformOrigin:"right"},lyricBgLine:{opacity:0,fontSize:"max(50%, 10px)",transition:"opacity 0.25s","&.active":{transition:"opacity 0.25s 0.25s",opacity:.75}},lyricMainLine:{transition:"opacity 0.3s 0.25s",willChange:"opacity",margin:"-1rem",padding:"1rem","& span":{display:"inline-block",margin:"-1rem",padding:"1rem"},"& > span":{whiteSpace:"pre-wrap",wordBreak:"keep-all",maxLines:"1",willChange:"transform,display,mask-image","&.emphasize":{margin:"-1rem",padding:"1rem",transformStyle:"preserve-3d",perspective:"50vw"}}},lyricSubLine:{fontSize:"max(50%, 10px)",opacity:.5},disableSpring:{"& > *":{transition:"filter 0.25s, transform 0.5s"}},interludeDots:{height:"min(1rem,2.5vh)",transformOrigin:"center",width:"fit-content",padding:"2.5% 0",position:"absolute",display:"flex",gap:"0.5rem","& > *":{width:"100%",display:"inline-block",borderRadius:"50%",aspectRatio:"1 / 1",backgroundColor:"var(--amll-lyric-view-color,white)",marginRight:"4px"},"&.duet":{right:"1rem",transformOrigin:"center"}},"@supports (mix-blend-mode: plus-lighter)":{lyricSubLine:{opacity:.3}},tmpDisableTransition:{transition:"none !important"}});onPageShow=()=>{this.calcLayout(!0,!0)};constructor(){super(),this.interludeDots=new W(this),this.bottomLine=new R(this),this.element.setAttribute("class",this.style.classes.lyricPlayer),this.disableSpring&&this.element.classList.add(this.style.classes.disableSpring),this.rebuildStyle(),this.resizeObserver.observe(this.element),this.element.appendChild(this.interludeDots.getElement()),this.element.appendChild(this.bottomLine.getElement()),this.style.attach(),this.interludeDots.setTransform(0,200),window.addEventListener("pageshow",this.onPageShow),this.element.addEventListener("wheel",e=>{this.allowScroll&&(this.isScrolled=!0,clearTimeout(this.scrolledHandler),this.scrolledHandler=setTimeout(()=>{this.isScrolled=!1,this.scrollOffset=0},5e3),this.invokedByScrollEvent=!0,e.deltaMode===e.DOM_DELTA_PIXEL?(this.scrollOffset+=e.deltaY,this.calcLayout(!0)):(this.scrollOffset+=e.deltaY*50,this.calcLayout(!1)),this.invokedByScrollEvent=!1)})}getCurrentInterlude(){if(this.bufferedLines.size>0)return;const e=this.currentTime+20,t=this.scrollToIndex;if(t===0){if(this.processedLines[0]?.startTime&&this.processedLines[0].startTime>e)return[0,this.processedLines[0].startTime,-2,this.processedLines[0].isDuet]}else if(this.processedLines[t]?.endTime&&this.processedLines[t+1]?.startTime&&this.processedLines[t+1].startTime>e&&this.processedLines[t].endTime<e)return[this.processedLines[t].endTime,this.processedLines[t+1].startTime,t,this.processedLines[t+1].isDuet]}rebuildStyle(){let e="";e+="--amll-lyric-player-width:",e+=this.innerSize[0],e+="px;",e+="--amll-lyric-player-height:",e+=this.innerSize[1],e+="px;",e+="--amll-player-time:",e+=this.currentTime,e+=";",this.element.setAttribute("style",e)}setEnableBlur(e){this.enableBlur!==e&&(this.enableBlur=e,this.calcLayout())}setLyricLines(e){this.lyricLines=e;const t=750;this.processedLines=e.filter(i=>i.words.reduce((r,n)=>r+n.word.trim().length,0)>0).map((i,r,n)=>{if(i.isBG)return{...i};{const s=n[r-1],a=n[r-2];if(s?.isBG&&a){if(a.endTime<i.startTime)return{...i,startTime:Math.max(a.endTime,i.startTime-t)||i.startTime}}else if(s?.endTime&&s.endTime<i.startTime)return{...i,startTime:Math.max(s?.endTime,i.startTime-t)||i.startTime};return{...i}}}),this.isNonDynamic=!0;for(const i of this.processedLines)if(i.words.length>1){this.isNonDynamic=!1;break}this.processedLines.forEach((i,r,n)=>{const s=n[r+1],a=i.words[i.words.length-1];a&&P(a)&&(s?s.startTime>i.endTime&&(i.endTime=Math.min(i.endTime+1500,s.startTime)):i.endTime=i.endTime+1500)}),this.processedLines.forEach((i,r,n)=>{if(i.isBG)return;const s=n[r+1];s?.isBG&&(s.startTime=Math.min(s.startTime,i.startTime))}),this.lyricLinesEl.forEach(i=>i.dispose()),this.lyricLinesEl=this.processedLines.map(i=>new G(this,i)),this.lyricLinesEl.forEach(i=>{this.element.appendChild(i.getElement()),i.updateMaskImage()}),this.interludeDots.setInterlude(void 0),this.hotLines.clear(),this.bufferedLines.clear(),this.setLinePosXSpringParams({}),this.setLinePosYSpringParams({}),this.setLineScaleSpringParams({}),this.setCurrentTime(0,!0),this.calcLayout(!0,!0)}calcLayout(e=!1,t=!1){t&&(this.lyricLinesEl.forEach(h=>{const d=h.measureSize();this.lyricLinesSize.set(h,d),h.lineSize=d}),this.interludeDotsSize[0]=this.interludeDots.getElement().clientWidth,this.interludeDotsSize[1]=this.interludeDots.getElement().clientHeight,this.bottomLine.lineSize=this.bottomLine.measureSize());const i=.95;let n=-this.lyricLinesEl.slice(0,this.scrollToIndex).reduce((h,d)=>h+(d.getLine().isBG?0:this.lyricLinesSize.get(d)?.[1]??0),0)-this.scrollOffset;if(this.alignAnchor==="bottom"){n+=this.element.clientHeight/2;const h=this.lyricLinesEl[this.scrollToIndex];if(h){const d=this.lyricLinesSize.get(h)?.[1]??0;n-=d/2}}else if(typeof this.alignAnchor=="number"){n+=this.element.clientHeight*this.alignAnchor;const h=this.lyricLinesEl[this.scrollToIndex];if(h){const d=this.lyricLinesSize.get(h)?.[1]??0;n-=d/2}}const s=this.getCurrentInterlude();let a=0;if(s){if(a=s[1]-s[0],a>=5e3){const h=this.lyricLinesEl[s[2]+1];h&&(n-=this.lyricLinesSize.get(h)?.[1]??0)}}else this.interludeDots.setInterlude(void 0);const l=Math.max(...this.bufferedLines);let o=0,m=!1;this.lyricLinesEl.forEach((h,d)=>{const f=this.bufferedLines.has(d),p=f||d>=this.scrollToIndex&&d<l,u=h.getLine();u.isDuet&&this.size[0]-(this.lyricLinesSize.get(h)?.[0]??0),!m&&a>=5e3&&(d===this.scrollToIndex&&s?.[2]===-2||d===this.scrollToIndex+1)&&(m=!0,this.interludeDots.setTransform(32,n),s&&this.interludeDots.setInterlude([s[0],s[1]]),n+=this.interludeDotsSize[1]),h.setTransform(0,n,p?1:i,f?1:1/3,!this.invokedByScrollEvent&&this.enableBlur?p?0:1+(d<this.scrollToIndex?Math.abs(this.scrollToIndex-d):Math.abs(d-Math.max(this.scrollToIndex,l))):0,e,o),u.isBG&&p?n+=this.lyricLinesSize.get(h)?.[1]??0:u.isBG||(n+=this.lyricLinesSize.get(h)?.[1]??0),n>=0&&(o+=.05)}),this.bottomLine.setTransform(0,n,e,o)}getCurrentTime(){return this.currentTime}getLyricLines(){return this.lyricLines}getElement(){return this.element}getBottomLineElement(){return this.bottomLine.getElement()}setAlignAnchor(e){this.alignAnchor=e}setCurrentTime(e,t=!1){if(this.currentTime=e,this.element.style.setProperty("--amll-player-time",`${e}`),this.isScrolled)return;const i=new Set,r=new Set,n=new Set;this.hotLines.forEach(s=>{const a=this.processedLines[s];if(a){if(a.isBG)return;const l=this.processedLines[s+1];if(l?.isBG){const o=Math.min(a.startTime,l?.startTime),m=Math.max(a.endTime,l?.endTime);(o>e||m<=e)&&(this.hotLines.delete(s),i.add(s),this.hotLines.delete(s+1),i.add(s+1),t&&(this.lyricLinesEl[s].disable(),this.lyricLinesEl[s+1].disable()))}else(a.startTime>e||a.endTime<=e)&&(this.hotLines.delete(s),i.add(s),t&&this.lyricLinesEl[s].disable())}else this.hotLines.delete(s),i.add(s),t&&this.lyricLinesEl[s].disable()}),this.processedLines.forEach((s,a,l)=>{!s.isBG&&s.startTime<=e&&s.endTime>e&&(this.hotLines.has(a)||(this.hotLines.add(a),n.add(a),t&&this.lyricLinesEl[a].enable(),l[a+1]?.isBG&&(this.hotLines.add(a+1),n.add(a+1),t&&this.lyricLinesEl[a+1].enable())))}),this.bufferedLines.forEach(s=>{this.hotLines.has(s)||(r.add(s),t&&this.lyricLinesEl[s].disable())}),t?(this.bufferedLines.size>0?this.scrollToIndex=Math.min(...this.bufferedLines):this.scrollToIndex=this.processedLines.findIndex(s=>s.startTime>=e),this.bufferedLines.clear(),this.hotLines.forEach(s=>this.bufferedLines.add(s)),this.calcLayout(!0)):(r.size>0||n.size>0)&&(r.size===0&&n.size>0?(n.forEach(s=>{this.bufferedLines.add(s),this.lyricLinesEl[s].enable()}),this.scrollToIndex=Math.min(...this.bufferedLines)):n.size===0&&r.size>0?q(r,this.bufferedLines)&&this.bufferedLines.forEach(s=>{this.hotLines.has(s)||(this.bufferedLines.delete(s),this.lyricLinesEl[s].disable())}):(n.forEach(s=>{this.bufferedLines.add(s),this.lyricLinesEl[s].enable()}),r.forEach(s=>{this.bufferedLines.delete(s),this.lyricLinesEl[s].disable()}),this.bufferedLines.size>0&&(this.scrollToIndex=Math.min(...this.bufferedLines))),this.calcLayout())}update(e=0){const t=e/1e3;this.interludeDots.update(e),this.bottomLine.update(t),this.lyricLinesEl.forEach(i=>i.update(t))}setLinePosXSpringParams(e){this.posXSpringParams={...this.posXSpringParams,...e},this.bottomLine.lineTransforms.posX.updateParams(this.posXSpringParams),this.lyricLinesEl.forEach(t=>t.lineTransforms.posX.updateParams(this.posXSpringParams))}setLinePosYSpringParams(e){this.posYSpringParams={...this.posYSpringParams,...e},this.bottomLine.lineTransforms.posY.updateParams(this.posYSpringParams),this.lyricLinesEl.forEach(t=>t.lineTransforms.posY.updateParams(this.posYSpringParams))}setLineScaleSpringParams(e){this.scaleSpringParams={...this.scaleSpringParams,...e},this.lyricLinesEl.forEach(t=>t.lineTransforms.scale.updateParams(this.scaleSpringParams))}dispose(){this.element.remove(),this.resizeObserver.disconnect(),this.style.detach(),this.lyricLinesEl.forEach(e=>e.dispose()),window.removeEventListener("pageshow",this.onPageShow),this.bottomLine.dispose(),this.interludeDots.dispose()}}exports.BackgroundRender=O;exports.LyricPlayer=j;exports.ttml=I;
//# sourceMappingURL=amll-core.js.map
