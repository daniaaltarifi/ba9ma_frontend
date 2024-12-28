"use strict";(self.webpackChunknaja=self.webpackChunknaja||[]).push([[278],{5278:(e,s,c)=>{c.r(s),c.d(s,{default:()=>p});var a=c(5043),r=c(6213),t=c(9023),n=c(8139),i=c.n(n),l=c(7852),o=c(579);const d=a.forwardRef(((e,s)=>{let{bsPrefix:c,className:a,striped:r,bordered:t,borderless:n,hover:d,size:h,variant:m,responsive:x,...p}=e;const j=(0,l.oU)(c,"table"),u=i()(a,j,m&&"".concat(j,"-").concat(m),h&&"".concat(j,"-").concat(h),r&&"".concat(j,"-").concat("string"===typeof r?"striped-".concat(r):"striped"),t&&"".concat(j,"-bordered"),n&&"".concat(j,"-borderless"),d&&"".concat(j,"-hover")),g=(0,o.jsx)("table",{...p,className:u,ref:s});if(x){let e="".concat(j,"-responsive");return"string"===typeof x&&(e="".concat(e,"-").concat(x)),(0,o.jsx)("div",{className:e,children:g})}return g}));var h=c(3216),m=c(5475),x=c(9748);const p=function(){const[e,s]=(0,a.useState)(""),[c,n]=(0,a.useState)([]),[i,l]=(0,a.useState)([]),[p,j]=(0,a.useState)(null),[u,g]=(0,a.useState)([]),[f,v]=(0,a.useState)([]),[_,y]=(0,a.useState)([]),N=(0,h.Zp)();(0,a.useEffect)((()=>{window.scrollTo(0,0);(async()=>{try{const e=(await r.A.get("".concat(x.H,"/availablecards"))).data.governorates;y(e)}catch(e){console.error("Error fetching library:",e)}})(),(async()=>{try{const e=(await r.A.get("".concat(x.H,"/departments/getDepartments"))).data;g(e)}catch(e){console.log("Error getting data from frontend: ".concat(e))}})(),(async()=>{try{const e=await r.A.get("".concat(x.H,"/purchasesteps"));v(e.data)}catch(e){console.error("Error fetching departments:",e)}})()}),[]);const[b,w]=(0,a.useState)([]),{hash:S}=(0,h.zy)();return(0,a.useEffect)((()=>{if(S){const e=document.querySelector(S);e&&e.scrollIntoView({behavior:"smooth"})}}),[S]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.A,{slider:b}),(0,o.jsx)("section",{className:"margin_section",children:(0,o.jsxs)("div",{className:"container text-center",id:"order-section",children:[(0,o.jsx)("h2",{className:"title_cardprice",children:"\u062a\u0641\u0627\u0635\u064a\u0644 \u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a"}),(0,o.jsx)("div",{className:"row d-flex justify-content-center",children:u.map((e=>(0,o.jsx)("div",{className:"col-lg-3 col-md-6 col-sm-12",children:(0,o.jsxs)(m.N_,{to:"/courses?department=".concat(e.id),style:{textDecoration:"none",color:"#000"},children:[(0,o.jsx)("div",{className:"box_purple__dep_cardprice",children:(0,o.jsx)("p",{children:e.title})}),(0,o.jsxs)("p",{children:[(0,o.jsxs)("b",{children:[" \xa0",e.price," \u062f\u064a\u0646\u0627\u0631\u064b\u0627\xa0 "]}),"\xa0\u0644\u0643\u0644 \u0641\u0635\u0644"]})]})},e.id)))})]})}),(0,o.jsx)("section",{className:"margin_section",children:(0,o.jsxs)("div",{className:"container ",children:[(0,o.jsx)("h2",{className:"title_cardprice",children:"\u062e\u0637\u0648\u0627\u062a \u0637\u0644\u0628 \u0648\u0634\u0631\u0627\u0621 \u0627\u0644\u0628\u0637\u0627\u0642\u0629"}),(0,o.jsx)("div",{className:"row d-flex justify-content-evenly",children:f.map((e=>(0,o.jsxs)("div",{className:"col-lg-3 col-md-6 col-sm-12 ",children:[(0,o.jsxs)("div",{className:"box_purple__orderby_cardprice",children:[(0,o.jsx)("img",{src:"https://res.cloudinary.com/durjqlivi/".concat(e.img),alt:"www icon",className:"img-fluid icon_orderby_cardprice",loading:"lazy"})," "]})," ",(0,o.jsxs)("p",{className:"name_of_orderby_cardprice",children:[e.title," "]}),(0,o.jsx)("p",{className:"desc_orderby_cardprice",children:e.descr})]})))})]})}),(0,o.jsx)("section",{className:"margin_section",children:(0,o.jsxs)("div",{class:"container text-center",children:[(0,o.jsx)("h1",{className:"faq",children:"\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u0645\u062a\u0648\u0641\u0631\u0629 \u0641\u064a"}),(0,o.jsx)("div",{className:"row mb-2",children:(0,o.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-12",children:(0,o.jsxs)("div",{className:"navbar__search",children:[(0,o.jsxs)("span",{children:[(0,o.jsx)("i",{className:"fa-solid fa-magnifying-glass fa-sm",style:{color:"#833988"}})," "]}),(0,o.jsx)("input",{type:"text",placeholder:"\u0627\u0628\u062d\u062b \u0639\u0646 ",value:e,className:"search_blog"}),(0,o.jsxs)("a",{href:"#",className:"btn btn-s purple_btn search_btn_blog",children:["\u0628\u062d\u062b"," "]}),e&&(0,o.jsx)("ul",{className:"search_dropdown",children:c.length>0?c.map((e=>(0,o.jsxs)("li",{onClick:()=>{N("/courses/".concat(e.id)),window.scrollTo(0,0)},children:[(0,o.jsx)("img",{src:e.image,alt:e.courseName,loading:"lazy"}),e.courseName]},e.id))):(0,o.jsx)("li",{children:"No courses found."})})]})})}),(0,o.jsx)("div",{class:"row",children:(0,o.jsx)("div",{className:"col",children:_.map((e=>(0,o.jsx)("div",{class:"row",children:(0,o.jsx)("div",{class:"col",children:(0,o.jsxs)("details",{onClick:()=>(async e=>{try{const s=await r.A.get("".concat(x.H,"/availablecards/available-cardsbygovermentId/").concat(e));l(s.data),j(e)}catch(s){console.error("Error fetching cards:",s)}})(e.id),children:[(0,o.jsx)("summary",{children:e.governorate}),(0,o.jsx)("div",{children:p===e.id&&(0,o.jsxs)(d,{striped:!0,hover:!0,children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{className:"table_head_cardprice",children:[(0,o.jsx)("th",{className:"desc_table_cardprice",children:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u062a\u0628\u0629"}),(0,o.jsx)("th",{className:"desc_table_cardprice",children:"\u0627\u0644\u0639\u0646\u0648\u0627\u0646"}),(0,o.jsx)("th",{className:"desc_table_cardprice",children:"\u0627\u0644\u0631\u0642\u0645"}),(0,o.jsx)("th",{className:"desc_table_cardprice",children:"\u0627\u0644\u0645\u0648\u0642\u0639"})]})}),(0,o.jsx)("tbody",{children:i.length>0?i.map((e=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:e.name}),(0,o.jsx)("td",{children:e.address}),(0,o.jsx)("td",{children:e.phone}),(0,o.jsxs)("td",{children:[(0,o.jsx)("i",{className:"fa-solid fa-location-dot ps-1",style:{color:"#f57d20"}}),(0,o.jsx)("a",{href:"https://maps.app.goo.gl/8nHFUUM7LgyZbzf19",target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none",color:"#000"},children:e.location})," "]})]},e.id))):(0,o.jsx)("tr",{children:(0,o.jsx)("td",{colSpan:"4",children:"No data available"})})})]})})]})})},e.id)))})})]})})]})}},9023:(e,s,c)=>{c.d(s,{A:()=>o});var a=c(5043),r=c(2382),t=(c(4430),c(9078),c(56),c(3216)),n=c(6213),i=c(9748),l=c(579);const o=function(){const[e,s]=(0,a.useState)([]),[c,o]=(0,a.useState)(!0),d=((0,t.Zp)(),(0,t.zy)().pathname);return(0,a.useEffect)((()=>{(async()=>{o(!0);try{const e=d.startsWith("/")?d.substring(1):d,c=await n.A.get("".concat(i.H,"/sliders/getSliderByPage/").concat(e));s(c.data)}catch(e){console.error("Failed to fetch slider:",e)}finally{o(!1)}})()}),[d]),(0,l.jsx)("div",{children:c?(0,l.jsx)("div",{className:"loading-spinner",children:"Loading..."}):(0,l.jsx)(r.A,{dots:!0,infinite:!0,slidesToShow:1,adaptiveHeight:!0,autoplay:!0,autoplaySpeed:5e3,arrows:!1,style:{overflow:"hidden"},children:e.map((e=>(0,l.jsxs)("div",{className:"slide-item",children:[e.slider_img?(0,l.jsx)("img",{srcSet:"https://res.cloudinary.com/durjqlivi/".concat(e.slider_img,"?w=800&f_auto&q_auto 800w,\n            https://res.cloudinary.com/durjqlivi/").concat(e.slider_img,"?w=1600&f_auto&q_auto 1600w"),src:"https://res.cloudinary.com/durjqlivi/".concat(e.slider_img,"?f_auto&q_auto"),sizes:"(max-width: 768px) 100vw, 50vw",alt:e.title||"slider img",className:"img_home",decoding:"async",loading:"lazy"}):(0,l.jsx)("img",{src:"https://example.com/placeholder.jpg",alt:"Default placeholder",className:"img_home",decoding:"async",loading:"lazy"}),(0,l.jsx)("div",{className:"overlay",children:(0,l.jsxs)("div",{className:"overlay-content",children:[(0,l.jsx)("h1",{className:"title_of_slidercomp",children:e.title}),(0,l.jsx)("p",{className:"paragraph_slider",children:e.descr||"\u0646\u062d\u0646 \u0647\u0646\u0627 \u062f\u0627\u0626\u0645\u064b\u0627 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643!"})]})})]},e.id)))})})}},7852:(e,s,c)=>{c.d(s,{Jm:()=>h,Wz:()=>m,gy:()=>d,oU:()=>o});var a=c(5043);c(579);const r=["xxl","xl","lg","md","sm","xs"],t="xs",n=a.createContext({prefixes:{},breakpoints:r,minBreakpoint:t}),{Consumer:i,Provider:l}=n;function o(e,s){const{prefixes:c}=(0,a.useContext)(n);return e||c[s]||s}function d(){const{breakpoints:e}=(0,a.useContext)(n);return e}function h(){const{minBreakpoint:e}=(0,a.useContext)(n);return e}function m(){const{dir:e}=(0,a.useContext)(n);return"rtl"===e}}}]);
//# sourceMappingURL=278.8a5b8b97.chunk.js.map