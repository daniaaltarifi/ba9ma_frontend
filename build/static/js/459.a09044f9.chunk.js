"use strict";(self.webpackChunknaja=self.webpackChunknaja||[]).push([[459],{8554:(e,s,a)=>{a.r(s),a.d(s,{default:()=>h});a(7609);var t=a(5475),o=a(5043),n=a(6213),r=a(7990),l=a.n(r),c=(a(6209),a(9495),a(1142)),i=a(8155),d=a(8589),m=a(579);const h=function(){const[e,s]=(0,o.useState)(""),[r,h]=(0,o.useState)(""),[u,p]=(0,o.useState)(""),[g,x]=(0,o.useState)(!1),[j,v]=(0,o.useState)(""),w=()=>{const e=new(l()),s=navigator.userAgent,a=e.parse(s);return{deviceType:a.device.type||"unknown",os:a.os.name||"unknown",osVersion:a.os.version||"unknown",browser:a.client.name||"unknown",browserVersion:a.client.version||"unknown"}},[_,f]=(0,o.useState)("");return(0,o.useEffect)((()=>{fetch("https://api.ipify.org?format=text").then((e=>e.text())).then((e=>{f(e)})).catch((e=>console.error("Error fetching IP address:",e)))}),[]),(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("section",{className:"margin_section",children:[(0,m.jsx)("div",{className:"container text-center",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsx)("div",{className:"col-lg-1"}),(0,m.jsxs)("div",{className:"col-lg-5 col-md-6 col-sm-12 box_purple_auth",children:[(0,m.jsxs)("div",{className:"",children:[(0,m.jsxs)("div",{className:"hello_logo_auth_cont",children:[(0,m.jsx)("p",{className:"hi_auth",children:"\u0645\u0631\u062d\u0628\u0627\u064b \u0628\u0643"}),(0,m.jsx)("img",{src:a(6102),alt:"ba9ma logo",className:"img-fluid logo_auth",loading:"lazy"})]}),(0,m.jsx)("div",{children:(0,m.jsx)(t.N_,{to:"/signup",children:(0,m.jsx)("button",{type:"button",className:"btn auth_btn",children:"\u0625\u0646\u0634\u0627\u0621 \u062d\u0633\u0627\u0628"})})})]})," "]}),(0,m.jsxs)("div",{className:"col-lg-5 col-md-6 col-sm-12 cont_input_auth ",children:[(0,m.jsxs)("div",{className:"row m-5",children:[(0,m.jsx)("p",{className:"title_of_input_auth",children:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0627\u0644\u0643\u062a\u0631\u0648\u0646\u064a"}),(0,m.jsx)("input",{type:"text",className:"search_blog ".concat(u&&"error_input"),value:e,onChange:e=>s(e.target.value)})]}),(0,m.jsxs)("div",{className:"row m-5",children:[(0,m.jsx)("p",{className:"title_of_input_auth",children:"\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631"}),(0,m.jsx)("input",{type:"password",className:"search_blog ".concat(u&&"error_input"),value:r,onChange:e=>h(e.target.value)}),(0,m.jsx)(t.N_,{to:"/forgotpassword",className:"forget_pass_auth",children:"\u0646\u0633\u064a\u062a \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061f"}),"              "]}),u&&(0,m.jsx)("p",{className:"error_message",children:u}),(0,m.jsx)("button",{type:"button",onClick:async s=>{s.preventDefault();const a=w();try{const s=await n.A.post("".concat(d.H,"/users/login"),{email:e,password:r,ip:_},{headers:{"Device-Info":JSON.stringify(a)}});s.data.token&&(localStorage.setItem("auth",s.data.token),localStorage.setItem("name",s.data.name),localStorage.setItem("id",s.data.id),localStorage.setItem("img",s.data.img),window.location.href="/")}catch(t){console.error("Login error:",t),t.response&&403===t.response.status?p("Login not allowed from this device"):p("Invalid email or password")}},className:"btn purple_btn mb-2",children:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644"})]}),(0,m.jsx)("div",{className:"col-lg-1"})]})}),(0,m.jsxs)(c.A,{show:g,onHide:()=>x(!1),children:[(0,m.jsx)(c.A.Header,{children:(0,m.jsx)(c.A.Title,{children:" \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644"})}),(0,m.jsx)(c.A.Body,{children:j}),(0,m.jsx)(c.A.Footer,{children:(0,m.jsx)(i.A,{style:{backgroundColor:"#833988",border:"none",textAlign:"center"},onClick:async s=>{s.preventDefault();const a=w();try{const s=await n.A.post("".concat(d.H,"/users/login"),{email:e,password:r,ip:_},{headers:{"Device-Info":JSON.stringify(a)}});s.data.token&&(localStorage.setItem("auth",s.data.token),localStorage.setItem("name",s.data.name),localStorage.setItem("id",s.data.id),localStorage.setItem("img",s.data.img),window.location.href="/")}catch(t){console.error("Login error:",t),t.response&&403===t.response.status?p("Login not allowed from this device"):p("Invalid email or password")}},children:"close          "})})]})]})})}},7609:()=>{},6102:(e,s,a)=>{e.exports=a.p+"static/media/ba9ma2.de61eeebb92ef68a2720.webp"}}]);
//# sourceMappingURL=459.a09044f9.chunk.js.map