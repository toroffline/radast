"use strict";(self.webpackChunkradast=self.webpackChunkradast||[]).push([[438],{3690:function(n,e,t){t.r(e),t.d(e,{default:function(){return y}});var i=t(4165),c=t(5861),r=t(1413),s=t(9439),a=t(2791),o=t(846),l=t(7689),u=t(7839),d=t(3853),f=t(184);var p=function(n){return(0,f.jsx)(u.zx,{type:"button",outline:!0,pill:!0,size:"xs",className:"round-full",onClick:function(e){return n.onClick(e)},children:n.icon})},h=t(3291);var x=function(){var n=(0,a.useState)(),e=(0,s.Z)(n,2),t=e[0],i=e[1];return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(u.Lt,{dismissOnClick:!1,label:"Market Cap",children:(0,f.jsx)(u.Lt.Item,{children:(0,f.jsxs)("div",{className:"flex",children:[(0,f.jsx)(u.oi,{type:"number",placeholder:"From",value:t,onKeyUp:function(n){console.log(n.key)},onChange:function(n){console.log(n.target.value),i(n.target.value)},onClick:function(n){n.stopPropagation()}}),(0,f.jsx)("span",{children:"-"}),(0,f.jsx)(u.oi,{type:"number",placeholder:"To",onClick:function(n){n.stopPropagation()}})]})})})})},m={isActive:!1,sortDirection:"desc"};function j(n){var e=n.display,t=n.sortDirection,i=n.isActive,c=n.className,r=n.onClickSorting;return(0,f.jsxs)(u.iA.HeadCell,{className:"flex hover:underline ".concat(c||""),onClick:function(){return r()},children:[e,(0,f.jsx)("span",{className:"table-header-icon ".concat(i?"active":""),children:"asc"===t?(0,f.jsx)(d.iRh,{}):(0,f.jsx)(d.tv1,{})})]})}var y=function(){var n=(0,l.s0)(),e=(0,a.useState)([]),t=(0,s.Z)(e,2),y=t[0],v=t[1],k=(0,a.useState)({companyName:{display:"Company Name",isActive:!0,sortDirection:"asc"},marketCap:{display:"Market Cap",isActive:!1,sortDirection:"asc"}}),C=(0,s.Z)(k,2),Z=C[0],g=C[1],N=(0,a.useState)(),A=(0,s.Z)(N,2),w=A[0],b=A[1],D=(0,a.useState)(!0),S=(0,s.Z)(D,2),F=S[0],E=S[1];function H(n){var e=(0,r.Z)({},Z);Object.keys(e).forEach((function(t){t===n?e[n].isActive?e[n].sortDirection="asc"===e[n].sortDirection?"desc":"asc":e[n].isActive=!0:e[t]=(0,r.Z)((0,r.Z)({},e[t]),m)})),g(e)}function O(){return O=(0,c.Z)((0,i.Z)().mark((function n(e){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return E(!0),n.next=3,o.Z.search(e).then((function(n){return v(n)})).finally((function(){return E(!1)}));case 3:case"end":return n.stop()}}),n)}))),O.apply(this,arguments)}function T(e){n("/company/detail/".concat(e))}return(0,a.useEffect)((function(){function n(){return(n=(0,c.Z)((0,i.Z)().mark((function n(){return(0,i.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.Z.getList().then((function(n){return v(n)})).finally((function(){return E(!1)}));case 2:case"end":return n.stop()}}),n)})))).apply(this,arguments)}E(!0),function(){n.apply(this,arguments)}()}),[]),(0,a.useEffect)((function(){var n=Object.keys(Z).find((function(n){return Z[n].isActive}));function e(){return(e=(0,c.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.sort(n,Z[n].sortDirection).then((function(n){return v(n)})).finally((function(){return E(!1)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}E(!0),function(){e.apply(this,arguments)}()}),[Z]),(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(u.Zb,{children:[(0,f.jsxs)("div",{className:"flex flex-row",children:[(0,f.jsx)(u.oi,{className:"company-input-search",icon:d.jRj,placeholder:"Search by name or relavant keyword",onChange:function(n){b(n.target.value)},onKeyUp:function(n){"Enter"===n.key&&function(n){O.apply(this,arguments)}(w)}}),(0,f.jsx)(x,{})]}),(0,f.jsxs)("div",{className:"content",children:[y&&y.length>0?(0,f.jsxs)(u.iA,{hoverable:!0,children:[(0,f.jsxs)(u.iA.Head,{children:[(0,f.jsx)(j,(0,r.Z)((0,r.Z)({},Z.companyName),{},{onClickSorting:function(){return H("companyName")}})),(0,f.jsx)(u.iA.HeadCell,{className:"text-center",children:"F Type"}),(0,f.jsx)(j,(0,r.Z)((0,r.Z)({},Z.marketCap),{},{onClickSorting:function(){return H("marketCap")},className:"justify-end"})),(0,f.jsx)(u.iA.HeadCell,{children:"Actions"})]}),(0,f.jsx)(u.iA.Body,{className:"divide-y",children:y.length>0&&y.map((function(n,e){return(0,f.jsxs)(u.iA.Row,{className:"bg-white",onClick:function(){return T(n.id)},children:[(0,f.jsx)(u.iA.Cell,{children:(0,f.jsxs)("div",{className:"flex",children:[(0,f.jsx)("img",{src:"/favicon.ico",className:"company-logo",alt:"company logo"}),(0,f.jsxs)("div",{children:[(0,f.jsx)("h3",{children:n.aliasName}),(0,f.jsx)("small",{children:n.name.en})]})]})}),(0,f.jsx)(u.iA.Cell,{className:"text-center",children:n.fType}),(0,f.jsx)(u.iA.Cell,{className:"text-right",children:n.marketCapDisplay||"NA"}),(0,f.jsx)(u.iA.Cell,{children:(0,f.jsxs)("div",{className:"flex gap-1",children:[(0,f.jsx)(p,{icon:(0,f.jsx)(d.rDJ,{}),onClick:function(){return T(n.id)}}),(0,f.jsx)(p,{icon:(0,f.jsx)(d.AlO,{}),onClick:function(e){e.stopPropagation(),window.open(n.url)}})]})})]},"company-list-".concat(e))}))})]}):(0,f.jsx)(f.Fragment,{children:!F&&(0,f.jsx)("div",{className:"no-data",children:"There is no data"})}),F&&(0,f.jsx)(h.Z,{})]})]})})}}}]);
//# sourceMappingURL=438.3213cf4c.chunk.js.map