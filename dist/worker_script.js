(()=>{var Y=Object.defineProperty;var ee=(r,e,t)=>e in r?Y(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(ee(r,typeof e!="symbol"?e+"":e,t),t);var S=new EventTarget;function N(r,e){let t=0;return function(){let s=this,i=arguments;t&&clearTimeout(t),t=setTimeout(r.bind(s,i),e)}}function j(r){let e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",t=[];for(let o=0;o<r;o++)t.push(e.charAt(Math.floor(Math.random()*e.length)));return t.join("")}var h=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope;var te=()=>{};var k=te,M=h?(...r)=>console.warn("[AMLL-Worker]",...r):console.warn,z=h?(...r)=>console.error("[AMLL-Worker]",...r):console.error;var E="Apple-Musiclike-lyrics";var G,D,K=`config.betterncm.${"plugin"in globalThis?((G=plugin==null?void 0:plugin.manifest)==null?void 0:G.slug)||((D=plugin==null?void 0:plugin.manifest)==null?void 0:D.name)||E:E}`,I=ne();function ne(){if(h)return{};try{return JSON.parse(localStorage.getItem(K)||"{}")}catch(r){return M("警告：AMLL 插件配置读取失败",r),{}}}var oe=N(function(){if(h){S.dispatchEvent(new Event("config-saved"));return}try{localStorage.setItem(K,JSON.stringify(I))}catch(e){M("警告：AMLL 插件配置保存失败",e)}S.dispatchEvent(new Event("config-saved"))},2e3);function H(r,e){h||$({[r]:e}),e===void 0?delete I[r]:I[r]=e,oe()}var v=class extends Array{constructor(t=(o,s)=>Number(o)-Number(s)){super();this._comparator=t;c(this,"_sorted",!1);c(this,"sort",t=>(this._comparator=t||this._comparator,this._sorted=!0,super.sort(this._comparator)));c(this,"push",t=>(this._sorted=!1,super.push(t)));c(this,"pop",()=>(this._sorted||this.sort(),super.pop()));c(this,"peek",t=>(this._sorted||this.sort(),t===void 0&&(t=this.length-1),this[t]));c(this,"size",()=>this.length);c(this,"debug",()=>(this._sorted||this.sort(),this))}};var y=class{constructor(e,t,o,s,i,m,a){this.r1=e;this.r2=t;this.g1=o;this.g2=s;this.b1=i;this.b2=m;this.histo=a;c(this,"_count",-1);c(this,"_volume",0);c(this,"_avg",[]);c(this,"volume",e=>this._volume&&!e?this._volume:(this._volume=(this.r2-this.r1+1)*(this.g2-this.g1+1)*(this.b2-this.b1+1),this._volume));c(this,"count",e=>{if(this._count>-1&&!e)return this._count;let t=0,o,s,i,m;for(o=this.r1;o<=this.r2;o++)for(s=this.g1;s<=this.g2;s++)for(i=this.b1;i<=this.b2;i++)m=b(o,s,i),t+=this.histo[m]||0;return this._count=t,this._count});c(this,"copy",()=>new y(this.r1,this.r2,this.g1,this.g2,this.b1,this.b2,this.histo));c(this,"avg",e=>{if(this._avg.length&&e)return this._avg;let t=0,o=1<<_,s=0,i=0,m=0,a,n,l,u,p;for(n=this.r1;n<=this.r2;n++)for(l=this.g1;l<=this.g2;l++)for(u=this.b1;u<=this.b2;u++)p=b(n,l,u),a=this.histo[p]||0,t+=a,s+=a*(n+.5)*o,i+=a*(l+.5)*o,m+=a*(u+.5)*o;return t?this._avg=[~~(s/t),~~(i/t),~~(m/t)]:this._avg=[~~(o*(this.r1+this.r2+1)/2),~~(o*(this.g1+this.g2+1)/2),~~(o*(this.b1+this.b2+1)/2)],this._avg});c(this,"contains",e=>{let[t,o,s]=e.map(i=>i>>_);return t>=this.r1&&t<=this.r2&&o>=this.g1&&o<=this.g2&&s>=this.b1&&s<=this.b2})}};var A=5,_=8-A,W=1e3,U=.75,f={naturalOrder:(r,e)=>r<e?-1:r>e?1:0,sum:(r,e)=>r.reduce((t,o)=>t+(e?e.call(r,o):Number(o)),0),max:(r,e)=>Math.max.apply(null,e?r.map(e):r.map(t=>Number(t))),size:r=>r.reduce((e,t)=>t?e+1:e,0)},b=(r,e,t)=>(r<<2*A)+(e<<A)+t;var q=r=>{let e=new Array(1<<3*A),t,o=1/0,s=0,i=1/0,m=0,a=1/0,n=0,l,u,p;return r.forEach(function(g){[l,u,p]=g.map(d=>d>>_),t=b(l,u,p),e[t]=(e[t]||0)+1,l<o?o=l:l>s&&(s=l),u<i?i=u:u>m&&(m=u),p<a?a=p:p>n&&(n=p)}),{vbox:new y(o,s,i,m,a,n,e),histo:e}},J=(r,e)=>{if(!e.count())return[];if(e.count()===1)return[e.copy()];let t=e.r2-e.r1+1,o=e.g2-e.g1+1,s=e.b2-e.b1+1,i=f.max([t,o,s]),m=[],a=0,n,l,u,p,g;if(i===t)for(n=e.r1;n<=e.r2;n++){for(p=0,l=e.g1;l<=e.g2;l++)for(u=e.b1;u<=e.b2;u++)g=b(n,l,u),p+=r[g]||0;a+=p,m[n]=a}else if(i===o)for(n=e.g1;n<=e.g2;n++){for(p=0,l=e.r1;l<=e.r2;l++)for(u=e.b1;u<=e.b2;u++)g=b(l,n,u),p+=r[g]||0;a+=p,m[n]=a}else for(n=e.b1;n<=e.b2;n++){for(p=0,l=e.r1;l<=e.r2;l++)for(u=e.g1;u<=e.g2;u++)g=b(l,u,n),p+=r[g]||0;a+=p,m[n]=a}let d=F=>{let L=`${F}1`,w=`${F}2`,T,B,P,O,x;for(n=e[L];n<=e[w]&&!(m[n]>=a/2);n++);for(P=e.copy(),O=e.copy(),T=n-e[L],B=e[w]-n,x=T<=B?Math.min(e[w]-1,~~(n+B/2)):Math.max(e[L],~~(n-1-T/2));!m[x]&&x<=e[w];)x++;return P[w]=x,O[L]=x+1,[P,O]};return d(i===t?"r":i===o?"g":"b")};var R=class{constructor(){c(this,"vboxes");c(this,"push",e=>{this.vboxes.push({vbox:e,color:e.avg()})});c(this,"palette",()=>this.vboxes.map(e=>e.color));c(this,"size",()=>this.vboxes.size());c(this,"map",e=>{for(let t=0;t<this.vboxes.size();t++)if(this.vboxes.peek(t).vbox.contains(e))return this.vboxes.peek(t).color;return this.nearest(e)});c(this,"nearest",e=>{let t,o,s,i;for(t=0;t<this.vboxes.size();t++)s=Math.sqrt(Math.pow(e[0]-this.vboxes.peek(t).color[0],2)+Math.pow(e[1]-this.vboxes.peek(t).color[1],2)+Math.pow(e[2]-this.vboxes.peek(t).color[2],2)),(o===void 0||s<o)&&(o=s,i=this.vboxes.peek(t).color);return i});c(this,"forcebw",()=>{this.vboxes.sort((s,i)=>f.naturalOrder(f.sum(s.color),f.sum(i.color)));let e=this.vboxes[0].color;e[0]<5&&e[1]<5&&e[2]<5&&(this.vboxes[0].color=[0,0,0]);let t=this.vboxes.length-1,o=this.vboxes[t].color;o[0]>251&&o[1]>251&&o[2]>251&&(this.vboxes[t].color=[255,255,255]),this.vboxes.sort(R._compare)});this.vboxes=new v(R._compare)}},C=R;c(C,"_compare",(e,t)=>f.naturalOrder(e.vbox.count()*e.vbox.volume(),t.vbox.count()*t.vbox.volume()));var Z=(r,e)=>{if(!r.length||e<1||e>256)return new C;let{histo:t,vbox:o}=q(r),s=new v((a,n)=>f.naturalOrder(a.count(),n.count()));s.push(o);let i=(a,n)=>{let l=a.size(),u=0,p;for(;u<W;){if(l>=n||u++>W||!a.peek().count())return;p=a.pop();let[g,d]=J(t,p);if(!g)return;a.push(g),d&&(a.push(d),l++)}};i(s,U*e),s.sort((a,n)=>f.naturalOrder(a.count()*a.volume(),n.count()*n.volume())),i(s,e);let m=new C;for(;s.size();)m.push(s.pop());return m};var Q;var V={},se=new Map;function X(r,e,t=[]){V[r]={funcName:r,funcBody:e};let o=0;return(...s)=>{if(Q)return new Promise((i,m)=>{let a=`${j(4)} - ${r} - ${o++}`;se.set(a,[i,m]),Q.postMessage({id:a,funcName:r,args:s},t.map(n=>s[n]).filter(n=>!!n))});APP_CONF.isOSX||M("AMLL Worker 尚未运行，正在本地线程执行函数",r,s);try{let i=e(...s);return Promise.resolve(i)}catch(i){return Promise.reject(i)}}}var He=X("grabImageColors",async(r,e=16)=>{let t=new OffscreenCanvas(r.width,r.height),o=t.getContext("2d");if(o){o.drawImage(r,0,0);let s=o.getImageData(0,0,t.width,t.height),i=[];for(let n=0;n<s.width*s.height;n++)i.push([s.data[n*4],s.data[n*4+1],s.data[n*4+2]]);let m=Z(i,e),a=[];return m.palette().forEach(n=>a.push(n)),a}else return[]}),$=X("setConfigFromMain",r=>{if(h){for(let e in r)H(e,r[e]);k("已从主线程同步配置",...Object.keys(r))}});onmessage=async r=>{try{k("正在执行后台任务",r.data.id,r.data.funcName,r.data.args);let t=await V[r.data.funcName].funcBody(...r.data.args);postMessage({id:r.data.id,result:t})}catch(e){z("后台任务发生错误",r.data.id,r.data.funcName,r.data.args,e),postMessage({id:r.data.id,result:void 0,error:e})}};k("AMLL 后台线程正在运行！");})();
