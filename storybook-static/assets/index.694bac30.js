function N(){}function W(t,n){for(const e in n)t[e]=n[e];return t}function P(t){return t()}function j(){return Object.create(null)}function m(t){t.forEach(P)}function O(t){return typeof t=="function"}function X(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function z(t){return Object.keys(t).length===0}function L(t,n){t.appendChild(n)}function Y(t,n,e){const o=M(t);if(!o.getElementById(n)){const r=q("style");r.id=n,r.textContent=e,R(o,r)}}function M(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function R(t,n){L(t.head||t,n)}function Z(t,n,e){t.insertBefore(n,e||null)}function T(t){t.parentNode.removeChild(t)}function tt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function q(t){return document.createElement(t)}function S(t){return document.createTextNode(t)}function nt(){return S(" ")}function et(){return S("")}function ot(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function rt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function F(t){return Array.from(t.childNodes)}function st(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function ct(t,n,e,o){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,o?"important":"")}function I(t,n,{bubbles:e=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,o,n),r}let h;function _(t){h=t}function B(){if(!h)throw new Error("Function called outside component initialization");return h}function ut(t){B().$$.on_mount.push(t)}function it(){const t=B();return(n,e,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[n];if(r){const i=I(n,e,{cancelable:o});return r.slice().forEach(u=>{u.call(t,i)}),!i.defaultPrevented}return!0}}const d=[],C=[],g=[],A=[],G=Promise.resolve();let x=!1;function H(){x||(x=!0,G.then(D))}function b(t){g.push(t)}const $=new Set;let p=0;function D(){const t=h;do{for(;p<d.length;){const n=d[p];p++,_(n),J(n.$$)}for(_(null),d.length=0,p=0;C.length;)C.pop()();for(let n=0;n<g.length;n+=1){const e=g[n];$.has(e)||($.add(e),e())}g.length=0}while(d.length);for(;A.length;)A.pop()();x=!1,$.clear(),_(t)}function J(t){if(t.fragment!==null){t.update(),m(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(b)}}const y=new Set;let l;function ft(){l={r:0,c:[],p:l}}function at(){l.r||m(l.c),l=l.p}function K(t,n){t&&t.i&&(y.delete(t),t.i(n))}function lt(t,n,e,o){if(t&&t.o){if(y.has(t))return;y.add(t),l.c.push(()=>{y.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}else o&&o()}function dt(t,n){const e={},o={},r={$$scope:1};let i=t.length;for(;i--;){const u=t[i],f=n[i];if(f){for(const s in u)s in f||(o[s]=1);for(const s in f)r[s]||(e[s]=f[s],r[s]=1);t[i]=f}else for(const s in u)r[s]=1}for(const u in o)u in e||(e[u]=void 0);return e}function _t(t){return typeof t=="object"&&t!==null?t:{}}function ht(t){t&&t.c()}function Q(t,n,e,o){const{fragment:r,on_mount:i,on_destroy:u,after_update:f}=t.$$;r&&r.m(n,e),o||b(()=>{const s=i.map(P).filter(O);u?u.push(...s):m(s),t.$$.on_mount=[]}),f.forEach(b)}function U(t,n){const e=t.$$;e.fragment!==null&&(m(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function V(t,n){t.$$.dirty[0]===-1&&(d.push(t),H(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function mt(t,n,e,o,r,i,u,f=[-1]){const s=h;_(t);const c=t.$$={fragment:null,ctx:null,props:i,update:N,not_equal:r,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(s?s.$$.context:[])),callbacks:j(),dirty:f,skip_bound:!1,root:n.target||s.$$.root};u&&u(c.root);let w=!1;if(c.ctx=e?e(t,n.props||{},(a,E,...v)=>{const k=v.length?v[0]:E;return c.ctx&&r(c.ctx[a],c.ctx[a]=k)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](k),w&&V(t,a)),E}):[],c.update(),w=!0,m(c.before_update),c.fragment=o?o(c.ctx):!1,n.target){if(n.hydrate){const a=F(n.target);c.fragment&&c.fragment.l(a),a.forEach(T)}else c.fragment&&c.fragment.c();n.intro&&K(t.$$.fragment),Q(t,n.target,n.anchor,n.customElement),D()}_(s)}class pt{$destroy(){U(this,1),this.$destroy=N}$on(n,e){const o=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return o.push(e),()=>{const r=o.indexOf(e);r!==-1&&o.splice(r,1)}}$set(n){this.$$set&&!z(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{nt as A,ct as B,tt as C,pt as S,Z as a,K as b,at as c,T as d,et as e,C as f,ft as g,ht as h,mt as i,dt as j,_t as k,U as l,Q as m,W as n,ut as o,N as p,q,S as r,X as s,lt as t,rt as u,L as v,ot as w,st as x,it as y,Y as z};
//# sourceMappingURL=index.694bac30.js.map