import{S as Dt,i as It,s as Tt,k as b,q as A,a as F,l as w,m as y,r as k,h as g,c as B,n as V,b as wt,G as l,J as $,K as tt,u as mt,H as gt,L as xt,M as St,o as Vt,N as Q,O as At,w as Ft}from"../chunks/index.02631393.js";import"../chunks/paths.93bb0dc0.js";const Et=["▾","▽","▷","▴","△","◃","◄","◅","◆","◇","◈","◸","◹","◺","◭","◮","◬","⃝","⃠","↺","↻","⇴","⌼","⌽","⌾","⍉","⍜","⍟","⍥","⎋","⏀","⏁","⏂","⏣","○","◌","◍","●","◐","◑","◒","◓","◔","◕","◖","◗","◙","◚","◛","◠","◡","◯","◴","◵","◶","◷","⚆","⚇","⚈","⚉","⚬","❍","⟟","⟲","⟳","⥀","⥁","⥈","⥉","⦲","⦵","⦺","⦻","⦽","⧂","⧃","⧇","⧬","⧭","⧲","⧳","⨢","⨭","⨮","⨴","⨵","⨷","⩹","⩺","⫯","⫰","⫱","⬤","⬰","￮","𐩑","𐩒","𑗘","𑗙","𑗚","𛲅","𛲕","╭","┌","┍","┎","┏","╭","╔","╒","╓","╮","┐","┑","┒","┓","╮","╗","╕","╖","╰","└","┕","┖","┗","╰","╚","╘","╙","╯","┘","┙","┚","┛","╯","╝","╛","╜","▀","▁","▂","▃","▄","▅","▆","▇","█","▉","▊","▋","▌","▍","▎","▏","▐","░","▒","▓","▔","▕","▖","▗","▘","▙","▚","▛","▜","▝","▞","▟"];yt(import.meta.url);function yt(e){const o=s=>s.map(a=>a.charAt(0).toUpperCase()+a.slice(1)),t=e.split("/").reverse().slice(0,2).map(s=>{(s.charAt(0)=="_"||s.charAt(0)=="$")&&(s=s.substring(1));let a=s.split(".");return a=a.slice(0,Math.max(a.length-1,1)),o(a).join("")}).reverse().join(":");return(...s)=>{const a=s.find(m=>typeof m=="string"?m.includes("trace"):!1);console.log(`[${t}]`,...s.filter(m=>m!=a)),a&&kt(`[${t}] 🔍 trace`)}}function kt(e){console&&console.trace&&(console.groupCollapsed(e),console.trace(),console.groupEnd())}function vt(e,o,t){const s=e.slice();return s[24]=o[t],s[26]=t,s}function bt(e){let o,t=e[24]+"",s,a,m,D;function N(...d){return e[10](e[26],...d)}return{c(){o=b("button"),s=A(t),a=F(),this.h()},l(d){o=w(d,"BUTTON",{});var f=y(o);s=k(f,t),a=B(f),f.forEach(g),this.h()},h(){Q(o,"none",e[26]==2),Q(o,"italic",e[1]==e[26]),Q(o,"bold",e[1]==e[26])},m(d,f){wt(d,o,f),l(o,s),l(o,a),m||(D=tt(o,"click",N),m=!0)},p(d,f){e=d,f&2&&Q(o,"italic",e[1]==e[26]),f&2&&Q(o,"bold",e[1]==e[26])},d(d){d&&g(o),m=!1,D()}}}function Bt(e){let o,t,s,a,m,D,N,d,f,h,v,q,U,H,P,I,C,X,O,K,M,j=e[8][e[1]]+"",L,r,u,c,p,S,T,x,G,z,R,et,W,nt,lt,ct,J=e[7],_=[];for(let i=0;i<J.length;i+=1)_[i]=bt(vt(e,J,i));return{c(){o=b("div"),t=b("div"),s=b("div"),a=A("Font:"),m=F(),D=b("div");for(let i=0;i<_.length;i+=1)_[i].c();N=F(),d=b("div"),f=A("Fill:"),h=F(),v=b("input"),q=F(),U=b("div"),H=A("Textarea:"),P=F(),I=b("textarea"),C=F(),X=b("div"),O=A("Size:"),K=F(),M=b("div"),L=A(j),r=A("px"),c=F(),p=b("div"),S=A("Pixels:"),T=F(),x=b("canvas"),G=F(),z=b("div"),R=b("pre"),et=A("			"),W=A(e[4]),nt=A(`
		`),this.h()},l(i){o=w(i,"DIV",{class:!0});var E=y(o);t=w(E,"DIV",{class:!0});var n=y(t);s=w(n,"DIV",{});var Y=y(s);a=k(Y,"Font:"),Y.forEach(g),m=B(n),D=w(n,"DIV",{class:!0});var ft=y(D);for(let st=0;st<_.length;st+=1)_[st].l(ft);ft.forEach(g),N=B(n),d=w(n,"DIV",{});var ut=y(d);f=k(ut,"Fill:"),ut.forEach(g),h=B(n),v=w(n,"INPUT",{type:!0,max:!0,min:!0}),q=B(n),U=w(n,"DIV",{});var ht=y(U);H=k(ht,"Textarea:"),ht.forEach(g),P=B(n),I=w(n,"TEXTAREA",{}),y(I).forEach(g),C=B(n),X=w(n,"DIV",{});var dt=y(X);O=k(dt,"Size:"),dt.forEach(g),K=B(n),M=w(n,"DIV",{style:!0});var ot=y(M);L=k(ot,j),r=k(ot,"px"),ot.forEach(g),c=B(n),p=w(n,"DIV",{});var pt=y(p);S=k(pt,"Pixels:"),pt.forEach(g),T=B(n),x=w(n,"CANVAS",{class:!0}),y(x).forEach(g),n.forEach(g),G=B(E),z=w(E,"DIV",{class:!0});var _t=y(z);R=w(_t,"PRE",{class:!0});var Z=y(R);et=k(Z,"			"),W=k(Z,e[4]),nt=k(Z,`
		`),Z.forEach(g),_t.forEach(g),E.forEach(g),this.h()},h(){V(D,"class","flex col cmb0-5 cmr0-5"),V(v,"type","range"),V(v,"max",Et.length-1),V(v,"min","0"),V(M,"style",u=`font-family: ${e[6]}; font-size: ${e[5]}px`),V(x,"class","border no-grow w-auto"),V(t,"class","flex column p1 cmb1 no-basis "),V(R,"class","flex f0 bold mb4"),V(z,"class","flex column-center-center bg color grow m1 border"),V(o,"class","flex row grow h100vh")},m(i,E){wt(i,o,E),l(o,t),l(t,s),l(s,a),l(t,m),l(t,D);for(let n=0;n<_.length;n+=1)_[n]&&_[n].m(D,null);l(t,N),l(t,d),l(d,f),l(t,h),l(t,v),$(v,e[2]),l(t,q),l(t,U),l(U,H),l(t,P),l(t,I),$(I,e[0]),l(t,C),l(t,X),l(X,O),l(t,K),l(t,M),l(M,L),l(M,r),l(t,c),l(t,p),l(p,S),l(t,T),l(t,x),e[13](x),l(o,G),l(o,z),l(z,R),l(R,et),l(R,W),l(R,nt),lt||(ct=[tt(v,"change",e[11]),tt(v,"input",e[11]),tt(I,"input",e[12])],lt=!0)},p(i,[E]){if(E&130){J=i[7];let n;for(n=0;n<J.length;n+=1){const Y=vt(i,J,n);_[n]?_[n].p(Y,E):(_[n]=bt(Y),_[n].c(),_[n].m(D,null))}for(;n<_.length;n+=1)_[n].d(1);_.length=J.length}E&4&&$(v,i[2]),E&1&&$(I,i[0]),E&2&&j!==(j=i[8][i[1]]+"")&&mt(L,j),E&96&&u!==(u=`font-family: ${i[6]}; font-size: ${i[5]}px`)&&V(M,"style",u),E&16&&mt(W,i[4])},i:gt,o:gt,d(i){i&&g(o),xt(_,i),e[13](null),lt=!1,St(ct)}}}const at="\\",it="/",rt="-";function Ct(e,o,t){let s,a,m;const D=yt(import.meta.url),N=["_04B03B.ttf","andina.ttf","peepo.ttf","quinny.ttf","rse.ttf","tandy.otf","thintel.ttf"],d=[8,10,0,10,16,13,16];let f="Hello!",h=null,v=[],q=4;Vt(U);async function U(){var r;for(let u of N){const c=(r=u.split("."))==null?void 0:r[0],p=`/pxfonts/${u}`;try{const T=await(await fetch(p)).arrayBuffer(),x=new FontFace(c,T);document.fonts.add(x),t(9,v=[...v,c]),await x.load(),D("✅",c,"Font loaded successfully",p)}catch(S){D("❌",c,S.message,p)}}H()}function H(){var x;if(!h)return;const r=h.getContext("2d"),c=f.split(`
`).length*a;r.letterSpacing=1,r.font=`${a}px ${s}`;const{width:p,fontBoundingBoxAscent:S,fontBoundingBoxDescent:T}=r.measureText((x=f.split(`
`).sort((G,z)=>z.length-G.length))==null?void 0:x[0]);t(3,h.width=p+3,h),t(3,h.height=c+2,h),Math.floor(h.width/2)-Math.floor(r.measureText(f).width/2),Math.floor(h.height/2)+Math.floor(a/2),t(3,h.style.imageRendering="pixelated",h),r.imageSmoothingEnabled=!1,r.font=`${a}px ${s}`,r.letterSpacing=100,f.split(`
`).forEach((G,z)=>{r.fillText(G,2,a*(z+1))}),t(4,P=""),window.requestAnimationFrame(X)}let P="",I;function C(r,u){return I.data[(u*I.width+r)*4+3]>255/2}function X(){if(f=="")return;I=h.getContext("2d").getImageData(0,0,h.width,h.height);for(let u=0;u<I.height+1;u++){for(let c=0;c<u;c++)t(4,P+=" ");for(let c=0;c<I.width;c++){let p,S,T;C(c,u)?(p=at,S=m,T=at):(p=rt,S=m?rt:"",T=rt,C(c+1,u-1)&&(T=it),C(c+1,u)&&(T=it),C(c,u-1)&&(p=it),C(c+1,u-1)&&!C(c,u-1)&&(p=at)),t(4,P+=p+S+T)}t(4,P+=`
`)}}let O=0;const K=(r,u)=>t(1,q=r);function M(){O=At(this.value),t(2,O)}function j(){f=this.value,t(0,f)}function L(r){Ft[r?"unshift":"push"](()=>{h=r,t(3,h)})}return e.$$.update=()=>{e.$$.dirty&514&&t(6,s=v[q]),e.$$.dirty&2&&t(5,a=d[q]),e.$$.dirty&4&&(m=Et[O]),e.$$.dirty&7&&H()},[f,q,O,h,P,a,s,N,d,v,K,M,j,L]}class Pt extends Dt{constructor(o){super(),It(this,o,Ct,Bt,Tt,{})}}export{Pt as default};
