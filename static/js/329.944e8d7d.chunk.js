"use strict";(self.webpackChunknaja=self.webpackChunknaja||[]).push([[329],{2329:(e,s,l)=>{l.r(s),l.d(s,{default:()=>h});var a=l(5043),c=(l(8357),l(184)),t=l(1462),i=l(4122),n=l(3216),o=l(5475),r=l(6213),d=l(9748),m=l(579);const h=function(){const[e,s]=(0,a.useState)(null),[h,x]=(0,a.useState)([]),[g,j]=(0,a.useState)([]),[u,N]=(0,a.useState)([]),{id:_}=((0,n.Zp)(),(0,n.g)());(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch("".concat(d.H,"/blog/getBlogById/").concat(_));if(!e.ok)throw new Error("Failed to fetch blog details");const l=await e.json();if(s(l),l.createdAt){const e=new Date(l.createdAt).toLocaleDateString("en-GB",{year:"numeric",month:"numeric",day:"numeric"});l.createdAt=e}console.log("data: ",l)}catch(e){console.error("Error fetching blog details:",e)}})(),(async()=>{const e=(await r.A.get("".concat(d.H,"/blog/lastthree"))).data.filter((e=>"approved"===e.action));x(e)})(),(async()=>{try{const e=(await r.A.get("".concat(d.H,"/Tags/getUniqueTags"))).data;j(e)}catch(e){console.error("Failed to fetch tags:",e)}})(),(async()=>{try{const e=await r.A.get("".concat(d.H,"/commentBlogs/getAllCommentBlogs")),s=e.data.filter((e=>"approved"===e.action));N(s)}catch(e){console.error("Error fetching comments:",e)}})()}),[_]);const[v,f]=(0,a.useState)(0),p=Math.ceil(u.length/3),b=3*v,y=b+3,w=u.slice(b,y);for(;w.length<3;)w.push(null);if(!e)return(0,m.jsx)("p",{children:"Loading..."});const{title:A,author:S,descr:k,img:C,createdAt:F}=e;return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{className:"container text-center cont_course_details",children:(0,m.jsxs)("div",{className:"row justify-content-center align-items-center",children:[(0,m.jsxs)("div",{className:"col-lg-6 col-md-6 cl-sm-12 d-flex justify-content-center",children:[(0,m.jsx)("img",{src:"https://res.cloudinary.com/durjqlivi/".concat(C),alt:"coursedetails",className:"img-fluid img_blogdetails",loading:"lazy"})," "]}),(0,m.jsxs)("div",{className:"col-lg-6 col-md-6 col-sm-12  justify-content-center align-items-center",children:[(0,m.jsxs)("div",{className:"d-flex justify-content-evenly ",children:[(0,m.jsx)("p",{className:"title_blogdetails",children:A}),(0,m.jsx)("p",{className:"teacher_coursedetails ms-5",children:S}),(0,m.jsx)("i",{className:"fa-solid fa-clock card_icon ",style:{color:"#F57D20"}}),(0,m.jsxs)("p",{className:"date_blogdetails",children:[" ",F]})]}),(0,m.jsxs)("h1",{className:"title_coursedetails",children:[" ",A," "]})]})]})}),(0,m.jsx)("section",{className:"margin_section",children:(0,m.jsx)("div",{className:"container ",children:(0,m.jsxs)("div",{className:"row ",children:[(0,m.jsxs)("div",{className:"col-lg-8 col-md-12 col-sm-12 cont_blogdetails",children:[(0,m.jsx)("p",{className:"desc_blogdetails",children:k}),(0,m.jsxs)("div",{className:"share_blogdetails_cont ",children:[(0,m.jsx)("div",{children:(0,m.jsx)("p",{className:"categories_title",children:"\u0645\u0634\u0627\u0631\u0643\u0629: "})}),(0,m.jsxs)("div",{className:"social_blogdetails",children:[(0,m.jsx)(c.ok6,{className:"social_icon_blogdetails"}),(0,m.jsx)(c.aR7,{className:"social_icon_blogdetails"}),(0,m.jsx)(c.Vk6,{className:"social_icon_blogdetails"}),(0,m.jsx)(c.xF4,{className:"social_icon_blogdetails"}),(0,m.jsx)(t.tZq,{className:"social_icon_blogdetails"})]})]}),(0,m.jsx)("div",{className:"container slider_blogdetails",children:(0,m.jsx)("div",{className:"slider",children:(0,m.jsx)("div",{className:"slider-content",children:u.map(((e,s)=>(0,m.jsx)("div",{className:"slider-item",children:e&&(0,m.jsxs)("div",{className:"row mb-2",children:[(0,m.jsx)("div",{className:"col-lg-1 col-md-2 col-sm-12",children:(0,m.jsx)("img",{src:l(2021),alt:"",height:"70vh",width:"70vh",className:"ps-3",loading:"lazy"})}),(0,m.jsxs)("div",{className:"col-lg-11 col-md-10 col-sm-12 ",children:[(0,m.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,m.jsx)("p",{className:"teacher_name_coursedetails",children:e.name}),(0,m.jsx)("p",{className:"comment_date_coursedetails",children:e.createdAt})]}),(0,m.jsx)("p",{className:"desc_of_teacher_coursedetails",children:e.comment})]})]})},s)))})})}),(0,m.jsx)("div",{className:"text-center mt-3",children:(0,m.jsxs)("div",{className:"col-md-12 col-sm-12 col_btn_prevNext",style:{marginTop:"10px"},children:[(0,m.jsx)("button",{onClick:()=>{f((e=>e===p-1?0:e+1))},className:"btn mb-3",children:(0,m.jsx)("i",{className:"fa fa-arrow-right"})}),(0,m.jsxs)("div",{style:{textAlign:"center",marginTop:"5px",fontSize:"18px"},children:[(0,m.jsx)("span",{style:{fontWeight:"bold"},children:v+1})," ","/ ",p]}),(0,m.jsx)("button",{onClick:()=>{f((e=>0===e?p-1:e-1))},className:"btn mb-3",children:(0,m.jsx)("i",{className:"fa fa-arrow-left"})})]})}),(0,m.jsx)(i.A,{title:"\u0627\u062a\u0631\u0643 \u062a\u0639\u0644\u064a\u0642",btn_title:"\u062a\u0639\u0644\u064a\u0642",handleSubmit:async(e,s,l)=>{try{await r.A.post("".concat(d.H,"/commentBlogs/addCommentBlog"),{name:e,email:s,comment:l,blog_id:_});window.location.reload()}catch(a){console.error("Error submitting comment:",a)}}})]}),(0,m.jsxs)("div",{className:"col-lg-3 col-md-12 col-sm-12 ",children:[(0,m.jsx)("p",{className:"categories_title",children:"\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062a \u0627\u0644\u0623\u062e\u064a\u0631\u0629"}),h.map((e=>(0,m.jsx)(o.N_,{to:"/blogdetails/".concat(e.id),style:{textDecoration:"none",color:"#000"},children:(0,m.jsxs)("div",{className:"categ_lastblog_cont",children:[(0,m.jsx)("img",{src:"https://res.cloudinary.com/durjqlivi/".concat(e.img),alt:"",className:"img-fluid img_last_blog",loading:"lazy"}),(0,m.jsx)("p",{className:"desc_last_blog",children:e.title})]})})))]})]})})})]})})}},4122:(e,s,l)=>{l.d(s,{A:()=>t});var a=l(5043),c=l(579);const t=function(e){let{title:s,btn_title:l,handleSubmit:t}=e;const[i,n]=(0,a.useState)(""),[o,r]=(0,a.useState)(""),[d,m]=(0,a.useState)(""),[h,x]=(0,a.useState)(0);return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("section",{className:"margin_section",children:(0,c.jsx)("div",{className:"container ",children:(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-6 col-sm-12",children:[(0,c.jsx)("h2",{className:"leave_comment_title",children:s}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0627\u0633\u0645"}),(0,c.jsx)("input",{type:"text",name:"name",value:i,onChange:e=>n(e.target.value),className:"comment_form_input"})]}),(0,c.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0627\u0644\u0643\u0646\u0631\u0648\u0646\u064a"}),(0,c.jsx)("input",{type:"email",name:"email",value:o,onChange:e=>r(e.target.value),className:"comment_form_input"})]})]}),(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0639\u0644\u064a\u0642 "}),(0,c.jsx)("input",{type:"textarea",className:"textarea_input_commentForm",value:d,onChange:e=>m(e.target.value)})]})}),(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0642\u064a\u064a\u0645"}),(0,c.jsx)("div",{className:"rating-input",children:[1,2,3,4,5].map((e=>(0,c.jsx)("i",{className:"fa-star ".concat(e<=h?"fa-solid":"fa-regular"),style:{color:"#F6B40A",cursor:"pointer"},onClick:()=>{x(e)}},e)))})]})}),(0,c.jsx)("div",{className:"row",children:(0,c.jsx)("div",{className:"col d-flex justify-content-center",children:(0,c.jsx)("button",{type:"submit",onClick:async e=>{if(e.preventDefault(),!i||!o||!d||0===h)return void alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0645\u0644\u0621 \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644 \u0648\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0642\u064a\u064a\u0645.");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))try{await t(i,o,d,h),n(""),r(""),m(""),x(0)}catch(s){console.error("Error submitting comment:",s)}else alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d.")},className:"submit_button_commentForm",children:l})})})]})})})})})}}}]);
//# sourceMappingURL=329.944e8d7d.chunk.js.map