"use strict";(self.webpackChunknaja=self.webpackChunknaja||[]).push([[306],{2306:(e,s,a)=>{a.r(s),a.d(s,{default:()=>g});var t=a(5043),c=(a(9312),a(3216)),l=a(5475),r=a(6775),n=a(3896),o=a(4122),i=a(423),d=a(9125),m=a(6213),u=a(378),h=a(8155),x=a(2462),j=a(1142),f=(a(7949),a(8273)),p=a(984),v=a(8873),N=a(6947),_=a(579);const g=function(){const{id:e}=(0,c.g)(),[s,g]=(0,t.useState)([]),[y,b]=(0,t.useState)([]),[w,S]=(0,t.useState)([]),[A,C]=(0,t.useState)(0),[k,E]=(0,t.useState)(null),[F,D]=(0,t.useState)(0),[L,T]=(0,t.useState)(0),[H,I]=(0,t.useState)(null),[M,q]=(0,t.useState)(!1),{user:P,logout:G}=(0,t.useContext)(u.R),{isLoggedIn:K,userName:O,userId:z,img:B}=P,[R,J]=(0,t.useState)(""),[$,U]=(0,t.useState)(""),[Y,V]=(0,t.useState)(""),[W,Q]=(0,t.useState)(""),[X,Z]=(0,t.useState)(""),[ee,se]=(0,t.useState)(""),[ae,te]=(0,t.useState)(""),[ce,le]=(0,t.useState)(""),[re,ne]=(0,t.useState)(""),[oe,ie]=(0,t.useState)(""),[de,me]=(0,t.useState)(""),[ue,he]=(0,t.useState)(!1),[xe,je]=(0,t.useState)(!1),[fe,pe]=(0,t.useState)(!1),[ve,Ne]=(0,t.useState)([]),[_e,ge]=(0,t.useState)(null),[ye,be]=(0,t.useState)({}),[we,Se]=(0,t.useState)(null);(0,t.useEffect)((()=>{window.scrollTo(0,0),Ve();(async()=>{try{const e=await m.A.get("".concat(N.H,"/commentCourse/getAllCommentCourses")),s=e.data.filter((e=>"approved"===e.action));S(s)}catch(e){console.error("Error fetching comments:",e)}})()}),[]),(0,t.useEffect)((()=>{(async()=>{try{const s=await fetch("".concat(N.H,"/Courses/videos/").concat(e));if(!s.ok)throw new Error("Failed to fetch video details");const a=await s.json();b(a);const t={};a.forEach((e=>{const s=localStorage.getItem("checkbox-".concat(e.id));t[e.id]=!!s&&JSON.parse(s)})),be(t)}catch(s){console.error("Error fetching video details:",s)}})()}),[e]);const[Ae,Ce]=(0,t.useState)(null),[ke,Ee]=(0,t.useState)(0),Fe=Math.ceil(w.length/3),De=()=>{Ee((e=>e===Fe-1?0:e+1))},Le=()=>{Ee((e=>0===e?Fe-1:e-1))},Te=3*ke,He=Te+3,Ie=w.slice(Te,He);for(;Ie.length<3;)Ie.push(null);const[Me,qe]=(0,t.useState)(null),[Pe,Ge]=(0,t.useState)(!1),Ke=e=>{(e.metaKey&&e.shiftKey&&"5"===e.key||e.ctrlKey&&e.altKey&&"r"===e.key||e.metaKey&&"4"===e.key||"PrintScreen"===e.key||"Meta"===e.key)&&Ge(!0)},Oe=()=>{setTimeout((()=>{Ge(!1)}),7e3)};(0,t.useEffect)((()=>(window.addEventListener("keydown",Ke),window.addEventListener("keyup",Oe),()=>{window.removeEventListener("keydown",Ke),window.removeEventListener("keyup",Oe)})),[]);const[ze,Be]=(0,t.useState)([]),Re=(0,t.useRef)([]),Je=(0,t.useRef)(null),$e=()=>{const e=Je.current;e&&console.log(Ue(e.duration))};(0,t.useEffect)((()=>(Re.current.forEach(((e,s)=>{e&&(e.addEventListener("loadedmetadata",(()=>{Be((a=>{const t=[...a];return t[s]=e.duration,t}))})),e.load())})),()=>{Re.current.forEach((e=>{e&&e.removeEventListener("loadedmetadata",(()=>{}))}))})),[y]);const Ue=e=>{if(isNaN(e)||e<0)return"Invalid Duration";const s=Math.floor(e/3600),a=Math.floor(e%3600/60),t=Math.floor(e%60);return"".concat(s.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"),":").concat(t.toString().padStart(2,"0"))},Ye=async(s,a,t,c)=>{try{const l=await m.A.post("".concat(N.H,"/commentCourse/addCommentCourse"),{name:s,email:a,comment:t,rating:c,course_id:e});200===l.status&&console.log("res",l.data)}catch(l){console.error("Error submitting comment:",l)}};(0,t.useEffect)((()=>{k&&(async()=>{try{const e=(await m.A.get("".concat(N.H,"/Courses/course-counts/").concat(k))).data;e.length>0&&C(e[0].course_count)}catch(e){console.error("Error fetching course count:",e)}})()}),[k]),(0,t.useEffect)((()=>{H&&(async()=>{try{const e=(await m.A.get("".concat(N.H,"/Courses/users-counts/").concat(H))).data;e&&void 0!==e.student_count&&D(e.student_count)}catch(e){console.error("Error fetching course count:",e)}})()}),[H]);const Ve=async()=>{try{const s=await fetch("".concat(N.H,"/Courses/details/").concat(e)),a=await s.json();g(a),E(a[0].teacher_id),a&&a[0]&&I(a[0].id)}catch(s){console.error("Error fetching course details:",s)}};(0,t.useEffect)((()=>{H&&(async()=>{try{const e=(await m.A.get("".concat(N.H,"/Courses/lesson-counts/").concat(H))).data;e.length>0?T(e[0].lesson_count):T(0)}catch(e){console.error("Error fetching course count:",e)}})()}),[H]);const We=()=>q(!1);return(0,t.useEffect)((()=>{H&&(async()=>{try{const e=await m.A.get("".concat(N.H,"/PaymentsDepartments/getallcourseusers"));Ne(e.data)}catch(e){console.error("Failed to fetch course users:",e)}})()}),[H]),(0,t.useEffect)((()=>{(async()=>{try{const e=await m.A.get("".concat(N.H,"/Courses/").concat(H));Se(e.data)}catch(e){console.error("Error fetching course data:",e)}})()}),[H]),(0,t.useEffect)((()=>{if(ve.length>0&&z&&H){const e=ve.find((e=>"approved"===e.payment_status&&e.user_id===z&&e.course_id===H)),s=new Date;if(e&&we&&we.expiration_date){const a=new Date(we.expiration_date);ge(s<=a?e:null)}else ge(e||null)}}),[ve,z,H,we]),(0,_.jsxs)(_.Fragment,{children:[s.map((e=>{var s,a;return(0,_.jsx)("div",{className:"container text-center cont_course_details",children:(0,_.jsxs)("div",{className:"row ",children:[(0,_.jsxs)("div",{className:"col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center",children:[(0,_.jsx)("img",{src:"https://res.cloudinary.com/durjqlivi/".concat(e.img),alt:"coursedetails",className:"img-fluid img_coursedetails",loading:"lazy"})," "]}),(0,_.jsxs)("div",{className:"col-lg-6 col-md-6 cl-sm-12 ",children:[(0,_.jsxs)("div",{className:"dep_teacher_coursedetails ",children:[(0,_.jsx)("p",{className:"dep_coursedetaile",children:null===(s=e.Department)||void 0===s?void 0:s.title}),(0,_.jsx)("p",{className:"teacher_coursedetails",children:null===(a=e.teacher)||void 0===a?void 0:a.teacher_name})]}),(0,_.jsx)("h1",{className:"title_coursedetails",children:e.subject_name}),(0,_.jsxs)("div",{className:"d-flex justify-content-around ",children:[(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{class:"fa-solid fa-graduation-cap card_icon",style:{color:"#F57D20"}}),(0,_.jsxs)("p",{className:"details_courses_card",children:[" ",F," \u0637\u0627\u0644\u0628 "]})]}),(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{class:"fa-solid fa-file card_icon",style:{color:"#F57D20"}}),(0,_.jsxs)("p",{className:"details_courses_card ",children:[" ",L," \u062f\u0631\u0633"]})]}),"0h 0m 0s"!==e.total_video_duration?(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{className:"fa-solid fa-clock card_icon",style:{color:"#F57D20"}}),(0,_.jsx)("p",{className:"details_courses_card",children:e.total_video_duration})]}):null]})]})]})},e.id)})),(0,_.jsx)("section",{className:"margin_section",children:(0,_.jsx)("div",{className:"container text-center",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsx)("div",{className:"col-lg-5 col-md-12 col-sm-12",onContextMenu:e=>{e.preventDefault()},children:y.length>0&&(0,_.jsx)("div",{className:"video_cont",children:(0,_.jsx)("div",{className:"video_wrapper",children:null===Ae?(0,_.jsxs)("div",{children:[(0,_.jsxs)("video",{ref:Je,onLoadedMetadata:$e,controls:!0,controlsList:"nodownload",className:"video_play",preload:"metadata",onEnded:()=>Ce((e=>(e+1)%y.length)),children:[(0,_.jsx)("source",{src:"https://res.cloudinary.com/durjqlivi/video/upload/".concat(y[0].course.defaultvideo),type:"video/mp4"}),"Your browser does not support the video tag."]},Ae),_e?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{className:"d-flex justify-content-center",children:(0,_.jsxs)("div",{children:[(0,_.jsx)("h2",{className:"title_after_purchase",children:y[0].subject_name}),(0,_.jsx)("h3",{className:"teachar_after_purchase",children:y[0].teacher.teacher_name})]})}),(0,_.jsx)("div",{className:"d-flex justify-content-center"})]}):(0,_.jsxs)("div",{children:[(0,_.jsxs)("div",{className:"d-flex justify-content-center",children:[(0,_.jsxs)("p",{className:"after_price_coursedetails",children:[y[0].course.after_offer," \u062f\u064a\u0646\u0627\u0631"]}),(0,_.jsxs)("p",{className:"before_price_coursedetails",children:[y[0].course.before_offer," \u062f\u064a\u0646\u0627\u0631"]})]}),(0,_.jsx)("button",{className:"purchase_now_coursedetails",onClick:()=>{K?q(!0):he(!0)},children:"\u0634\u0631\u0627\u0621 \u0627\u0644\u0627\u0646"})]}),(0,_.jsxs)(j.A,{show:M,onHide:We,dir:"rtl",children:[(0,_.jsx)(j.A.Title,{className:"modal_title",children:"\u0634\u0631\u0627\u0621 \u0645\u0627\u062f\u0629"}),(0,_.jsx)(j.A.Body,{children:(0,_.jsxs)(x.A,{id:"buyDepartmentForm",children:[(0,_.jsxs)(x.A.Group,{className:"mb-3",children:[(0,_.jsx)(x.A.Label,{className:"text_field",children:"\u0627\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628"}),(0,_.jsx)(x.A.Control,{type:"text",className:"input_filed_modal ".concat(ce?"border-danger":""),value:R,onChange:e=>J(e.target.value),required:!0}),ce&&(0,_.jsx)(x.A.Text,{className:"text-danger",children:ce})]}),(0,_.jsxs)(x.A.Group,{className:"mb-3",children:[(0,_.jsx)(x.A.Label,{className:"text_field text-center",children:"\u0627\u0644\u0623\u064a\u0645\u064a\u0644"}),(0,_.jsx)(x.A.Control,{type:"email",className:"input_filed_modal ".concat(re?"border-danger":""),value:$,onChange:e=>U(e.target.value),required:!0}),re&&(0,_.jsx)(x.A.Text,{className:"text-danger",children:re})]}),(0,_.jsxs)(x.A.Group,{className:"mb-3",children:[(0,_.jsx)(x.A.Label,{className:"text_field text-center",children:"\u0645\u0643\u0627\u0646 \u0627\u0644\u0633\u0643\u0646"}),(0,_.jsx)(x.A.Control,{type:"text",className:"input_filed_modal ".concat(oe?"border-danger":""),value:Y,onChange:e=>V(e.target.value),required:!0}),oe&&(0,_.jsx)(x.A.Text,{className:"text-danger",children:oe})]}),(0,_.jsxs)(x.A.Group,{className:"mb-3",children:[(0,_.jsx)(x.A.Label,{className:"text_field text-center",children:"\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641"}),(0,_.jsx)(x.A.Control,{type:"text",className:"input_filed_modal ".concat(de?"border-danger":""),value:W,onChange:e=>Q(e.target.value),required:!0}),de&&(0,_.jsx)(x.A.Text,{className:"text-danger",children:de})]}),(0,_.jsxs)(x.A.Group,{className:"mb-3",children:[(0,_.jsx)(x.A.Label,{className:"text_field text-center",children:"\u0627\u0644\u0643\u0648\u0628\u0648\u0646"}),(0,_.jsx)(x.A.Control,{type:"text",className:"input_filed_modal ".concat(ae?"border-danger":""),value:X,onChange:e=>Z(e.target.value),required:!0}),ae&&(0,_.jsx)(x.A.Text,{className:"text-danger",children:ae})]})]})}),(0,_.jsx)(j.A.Footer,{children:(0,_.jsx)(h.A,{type:"submit",onClick:async e=>{e.preventDefault();const s={};R||(s.studentName="\u0627\u0633\u0645 \u0627\u0644\u0637\u0627\u0644\u0628 \u0645\u0637\u0644\u0648\u0628"),$&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($)||(s.email="\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u063a\u064a\u0631 \u0635\u062d\u064a\u062d"),Y||(s.address="\u0645\u0643\u0627\u0646 \u0627\u0644\u0633\u0643\u0646 \u0645\u0637\u0644\u0648\u0628"),W&&/^\d+$/.test(W)||(s.phone="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d");const a=await(async e=>{try{const e=await fetch("".concat(N.H,"/PaymentsCourse/validate"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({coupon_code:X,course_id:H})}),s=await e.json();return e.ok?"course"!==s.couponType?"\u0631\u0645\u0632 \u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d":"":s.error||"Invalid coupon code"}catch(s){return console.error("Error checking coupon code:",s),"Invalid coupon code"}})();if(X&&!a||(s.couponCode=a||"\u0631\u0642\u0645 \u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d"),le(s.studentName||""),ne(s.email||""),ie(s.address||""),me(s.phone||""),te(s.couponCode||""),Object.keys(s).length>0)return;te(""),le(""),ne(""),ie(""),me("");const t=localStorage.getItem("id");if(!t)return se("User ID not found. Please log in."),We(),void he(!0);try{await m.A.post("".concat(N.H,"/PaymentsCourse/courses"),{student_name:R,email:$,address:Y,phone:W,coupon_code:X,course_id:H,user_id:t});se("Request was successful!"),We(),pe(!0),je(!0),J(""),U(""),V(""),V(""),Q(""),Z("")}catch(c){console.error("Error submitting form:",c.response?c.response.data:c.message),c.response&&c.response.data&&"Invalid coupon code"===c.response.data.error?te("\u0631\u0642\u0645 \u0627\u0644\u0643\u0648\u0628\u0648\u0646 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d"):se("There was an error with your submission.")}},form:"buyDepartmentForm",className:"buy_department_btn",children:"\u0634\u0631\u0627\u0621 \u0627\u0644\u0622\u0646"})})]})]}):y[Ae]&&(0,_.jsx)("div",{children:"file"===y[Ae].type&&_e?(0,_.jsx)("div",{children:(0,_.jsxs)("div",{className:"video_wrapper",children:[(0,_.jsxs)("video",{ref:Je,onLoadedMetadata:$e,controls:!0,controlsList:"nodownload",className:"video_play",preload:"metadata",children:[(0,_.jsx)("source",{src:"https://res.cloudinary.com/durjqlivi/video/upload/".concat(y[Ae].url),type:"video/mp4"}),"Your browser does not support the video tag."]},Ae),(0,_.jsx)("div",{className:"d-flex justify-content-evenly",children:(0,_.jsxs)("div",{children:[(0,_.jsx)("h2",{className:"title_after_purchase",children:y[0].subject_name}),(0,_.jsx)("h3",{className:"teachar_after_purchase",children:y[0].teacher.teacher_name})]})})]})}):"link"===y[Ae].type?(0,_.jsxs)("div",{className:"frame-responsive",children:[(0,_.jsx)("iframe",{width:"100%",height:"250",src:y[Ae].link,title:"Video player",allowFullScreen:!0},Ae),(0,_.jsx)("h2",{className:"title_after_purchase",children:y[0].subject_name}),(0,_.jsx)("h3",{className:"teachar_after_purchase",children:y[0].teacher.teacher_name})]}):(0,_.jsxs)("div",{children:[(0,_.jsxs)("div",{className:"d-flex justify-content-center",children:[(0,_.jsxs)("p",{className:"after_price_coursedetails",children:[y[0].course.after_offer," \u062f\u064a\u0646\u0627\u0631"]}),(0,_.jsxs)("p",{className:"before_price_coursedetails",children:[y[0].course.before_offer," \u062f\u064a\u0646\u0627\u0631"]})]}),(0,_.jsx)("button",{className:"purchase_now_coursedetails",onClick:()=>q(!0),children:"\u0634\u0631\u0627\u0621 \u0627\u0644\u0627\u0646"})]})})})})}),s.map((e=>{var s,t;return(0,_.jsxs)("div",{className:"col-lg-7 col-md-12 col-sm-12 col_tabs_coursedetails",children:[(0,_.jsxs)(r.A,{children:[(0,_.jsx)(n.A,{title:"\u0639\u0646 \u0627\u0644\u0645\u0627\u062f\u0629",children:(0,_.jsx)("div",{className:"description_coursedetails",children:(0,_.jsx)(v.default,{text:e.descr,min:200,ideal:300,max:500,readMoreText:"\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064a\u062f",readMoreClassName:"read-more-button"})})}),_e?(0,_.jsx)(n.A,{title:"\u0627\u0644\u0645\u0648\u0636\u0648\u0639\u0627\u062a",children:(0,_.jsxs)("div",{children:[(0,_.jsx)("p",{className:"description_coursedetails",children:e.descr}),(0,_.jsx)("div",{className:"container text-center",children:y.map(((e,s)=>(0,_.jsxs)("div",{className:"row topic_list_tabs_cont",onClick:()=>{return s=e.id,void qe(Me===s?null:s);var s},children:[(0,_.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12 ".concat(Me===e.id?"mb-3":""),children:(0,_.jsxs)("div",{className:"d-flex align-items-center pt-2",children:[(0,_.jsx)(i.pte,{}),(0,_.jsx)("li",{style:{cursor:"pointer"},children:e.title})]})}),(0,_.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12",children:(0,_.jsxs)("div",{className:"d-flex justify-content-evenly",children:[(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{className:"fa-solid fa-file card_icon",style:{color:"#F57D20"}}),(0,_.jsx)("p",{className:"details_courses_card",children:"1 \u062f\u0631\u0633"})]}),"file"===e.type&&(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{className:"fa-solid fa-clock card_icon",style:{color:"#F57D20"}}),(0,_.jsx)("p",{className:"details_courses_card",children:e.duration})]})]})}),Me===e.id&&(0,_.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,_.jsx)("p",{style:{marginTop:"10px"},children:e.descr}),(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("input",{type:"checkbox",value:"Paneer",id:"checkbox-".concat(e.id),name:"checkbox-".concat(e.id),className:"checkbox_coursedetails",checked:ye[e.id]||!1,onChange:()=>(e=>{const s=!ye[e];be((a=>({...a,[e]:s}))),localStorage.setItem("checkbox-".concat(e),JSON.stringify(s))})(e.id)}),(0,_.jsxs)("button",{className:"show_video_btn",onClick:()=>(e=>{Ce(e)})(s),children:["\u0645\u0634\u0627\u0647\u062f\u0629"," ",(0,_.jsx)("i",{className:"fa-regular fa-circle-play",style:{color:"#fff"}})]})]})]}),(0,_.jsx)("video",{ref:e=>Re.current[s]=e,src:e.videoUrl,style:{display:"none"}})]},e.id)))})]})}):(0,_.jsx)("p",{}),(0,_.jsx)(n.A,{title:"\u0627\u0644\u0645\u062f\u0631\u0628",children:(0,_.jsx)("div",{className:"container text-center",children:(0,_.jsxs)("div",{className:"row",children:[(0,_.jsx)("div",{className:"col-lg-3 col-md-3 col-sm-12",children:(0,_.jsx)("img",{src:"".concat(e.teacher.img),alt:"teacher img",height:"80vh",width:"80vh",loading:"lazy"})}),(0,_.jsxs)("div",{className:"col-lg-9 col-md-9 col-sm-12",children:[(0,_.jsxs)("p",{className:"teacher_name_coursedetails",children:[null===(s=e.teacher)||void 0===s?void 0:s.teacher_name," "]}),(0,_.jsxs)("p",{className:"desc_of_teacher_coursedetails",children:[null===(t=e.teacher)||void 0===t?void 0:t.teacher_descr," "]}),(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("i",{className:"fa-solid fa-file card_icon ps-2",style:{color:"#F57D20"}}),(0,_.jsxs)("p",{className:"details_courses_card",children:[" ",A,"\u0645\u0627\u062f\u0629"," "]})]}),(0,_.jsxs)("div",{className:"d-flex",children:[(0,_.jsx)("p",{children:"\u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629:"}),(0,_.jsx)(l.N_,{to:"",children:(0,_.jsx)("i",{className:"fa-brands fa-facebook-f m-2",style:{color:"#000"}})}),(0,_.jsx)(l.N_,{to:"",children:(0,_.jsx)("i",{className:"fa-brands fa-x-twitter m-2",style:{color:"#000"}})}),(0,_.jsx)(l.N_,{to:"",children:(0,_.jsx)("i",{className:"fa-brands fa-instagram m-2",style:{color:"#000"}})}),(0,_.jsx)(l.N_,{to:"",children:(0,_.jsx)("i",{className:"fa-brands fa-linkedin-in m-2",style:{color:"#000"}})})]})]})]})})}),(0,_.jsxs)(n.A,{title:"\u0627\u0644\u0623\u0631\u0627\u0621",children:[(0,_.jsx)(d.A,{comments:w}),(0,_.jsx)("div",{className:"container",children:(0,_.jsx)("div",{className:"slider",children:(0,_.jsx)("div",{className:"slider-content",children:Ie.map(((e,s)=>(0,_.jsx)("div",{className:"slider-item",children:e&&(0,_.jsxs)("div",{className:"row mb-2",children:[(0,_.jsx)("div",{className:"col-lg-3 col-md-3 col-sm-12",children:(0,_.jsx)("img",{src:a(2021),alt:"course",height:"70vh",width:"70vh",loading:"lazy"})}),(0,_.jsxs)("div",{className:"col-lg-9 col-md-9 col-sm-12",children:[(0,_.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,_.jsx)("p",{className:"teacher_name_coursedetails",children:e.name}),(0,_.jsx)("p",{className:"comment_date_coursedetails",children:e.created_at})]}),(0,_.jsx)("p",{className:"desc_of_teacher_coursedetails",children:e.comment})]})]})},s)))})})}),(0,_.jsx)("div",{className:"text-center mt-3",children:(0,_.jsxs)("div",{className:"col-md-12 col-sm-12 col_btn_prevNext",style:{marginTop:"10px"},children:[(0,_.jsx)("button",{onClick:De,className:"btn mb-3",children:(0,_.jsx)("i",{className:"fa fa-arrow-right"})}),(0,_.jsxs)("div",{style:{textAlign:"center",marginTop:"5px",fontSize:"18px"},children:[(0,_.jsx)("span",{style:{fontWeight:"bold"},children:ke+1})," ","/ ",Fe]}),(0,_.jsx)("button",{onClick:Le,className:"btn mb-3",children:(0,_.jsx)("i",{className:"fa fa-arrow-left"})})]})})]})]}),(0,_.jsx)(o.A,{title:"\u0627\u062a\u0631\u0643 \u062a\u0639\u0644\u064a\u0642",btn_title:"\u062a\u0639\u0644\u064a\u0642",handleSubmit:Ye})]},e.id)}))]})})}),ue&&(0,_.jsx)(f.A,{title_popup:"\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",description_popup:"\u0644\u0634\u0631\u0627\u0621 \u0642\u0633\u0645 \u064a\u062c\u0628 \u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644",show:ue,onClose:()=>{he(!1)}}),xe&&(0,_.jsx)(p.A,{title_popup_confirm:" \u062a\u0646\u0628\u064a\u0647",description_popup_confirm:"\u062a\u0645\u062a \u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0628\u0646\u062c\u0627\u062d ,\u0627\u0646\u062a\u0642\u0644 \u0627\u0644\u0649 \u062f\u0648\u0631\u0627\u062a\u064a",smShow:fe,onClose:()=>{je(!1)}})]})}},3896:(e,s,a)=>{a.d(s,{A:()=>c});a(5043);var t=a(579);const c=e=>{let{title:s,children:a}=e;return(0,t.jsx)("div",{className:"tab-content",children:a})}},6775:(e,s,a)=>{a.d(s,{A:()=>l});var t=a(5043),c=a(579);const l=e=>{let{children:s}=e;const[a,l]=(0,t.useState)(0);return(0,c.jsxs)("div",{className:"tabs-container",children:[(0,c.jsx)("div",{className:"tabs",children:s.map(((e,s)=>(0,c.jsx)("button",{className:"tab ".concat(a===s?"selected":""),onClick:()=>l(s),children:e.props.title},s)))}),(0,c.jsx)("div",{className:"tabs_cont_coursedetails",children:s[a]})]})}},4122:(e,s,a)=>{a.d(s,{A:()=>l});var t=a(5043),c=a(579);const l=function(e){let{title:s,btn_title:a,handleSubmit:l}=e;const[r,n]=(0,t.useState)(""),[o,i]=(0,t.useState)(""),[d,m]=(0,t.useState)(""),[u,h]=(0,t.useState)(0);return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("section",{className:"margin_section",children:(0,c.jsx)("div",{className:"container ",children:(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-6 col-sm-12",children:[(0,c.jsx)("h2",{className:"leave_comment_title",children:s}),(0,c.jsxs)("div",{className:"row",children:[(0,c.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0627\u0633\u0645"}),(0,c.jsx)("input",{type:"text",name:"name",value:r,onChange:e=>n(e.target.value),className:"comment_form_input"})]}),(0,c.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0627\u0644\u0643\u0646\u0631\u0648\u0646\u064a"}),(0,c.jsx)("input",{type:"email",name:"email",value:o,onChange:e=>i(e.target.value),className:"comment_form_input"})]})]}),(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0639\u0644\u064a\u0642 "}),(0,c.jsx)("input",{type:"textarea",className:"textarea_input_commentForm",value:d,onChange:e=>m(e.target.value)})]})}),(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,c.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0642\u064a\u064a\u0645"}),(0,c.jsx)("div",{className:"rating-input",children:[1,2,3,4,5].map((e=>(0,c.jsx)("i",{className:"fa-star ".concat(e<=u?"fa-solid":"fa-regular"),style:{color:"#F6B40A",cursor:"pointer"},onClick:()=>{h(e)}},e)))})]})}),(0,c.jsx)("div",{className:"row",children:(0,c.jsx)("div",{className:"col d-flex justify-content-center",children:(0,c.jsx)("button",{type:"submit",onClick:async e=>{if(e.preventDefault(),!r||!o||!d||0===u)return void alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0645\u0644\u0621 \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644 \u0648\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0642\u064a\u064a\u0645.");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))try{await l(r,o,d,u),n(""),i(""),m(""),h(0)}catch(s){console.error("Error submitting comment:",s)}else alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d.")},className:"submit_button_commentForm",children:a})})})]})})})})})}},9125:(e,s,a)=>{a.d(s,{A:()=>l});var t=a(5043),c=a(579);const l=function(e){let{comments:s}=e;const[a,l]=(0,t.useState)(0);(0,t.useEffect)((()=>{if(s.length>0){const e=s.reduce(((e,s)=>e+s.rating),0);l((e/s.length).toFixed(1))}else l(0)}),[s]);const r=[5,4,3,2,1].map((e=>({star:e,count:s.filter((s=>s.rating===e)).length}))),n=e=>(e/s.length*100).toFixed(0);return(0,c.jsxs)("div",{dir:"ltr",className:"mb-3",children:[(0,c.jsxs)("div",{className:"d-flex",children:[(0,c.jsx)("div",{className:"d-flex justify-content-center align-items-center",children:(0,c.jsx)("p",{className:"total_rating",children:a})}),(0,c.jsxs)("div",{className:"p-3",children:[[1,2,3,4,5].map(((e,s)=>(0,c.jsx)("span",{className:"fa fa-star ".concat(s<a?"checked":"")},s))),(0,c.jsxs)("p",{children:[" based on ",s.length," ratings."]})]})]}),(0,c.jsx)("div",{className:"row",children:r.map((e=>{let{star:s,count:a}=e;return(0,c.jsxs)(t.Fragment,{children:[(0,c.jsx)("div",{className:"side_rating",children:(0,c.jsxs)("div",{className:"d-flex",children:[[...Array(s)].map(((e,s)=>(0,c.jsx)("i",{className:"fa-solid fa-star",style:{color:"#F6B40A"}},s))),[...Array(5-s)].map(((e,s)=>(0,c.jsx)("i",{className:"fa-regular fa-star",style:{color:"#F6B40A"}},s)))]})}),(0,c.jsx)("div",{className:"percentage_cont",children:(0,c.jsxs)("span",{className:"percentage_rating",children:[n(a),"%"]})}),(0,c.jsx)("div",{className:"middle",children:(0,c.jsx)("div",{className:"bar-container",children:(0,c.jsx)("div",{className:"bar-1",style:{width:"".concat(n(a),"%")}})})})]},s)}))})]})}},9312:()=>{}}]);
//# sourceMappingURL=306.0f2571a8.chunk.js.map