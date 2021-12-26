(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{21:function(e,t,s){},24:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),r=s(11),a=s.n(r),i=(s(21),s(15)),l=s(2),o=s(0),j=function(){return Object(o.jsx)("div",{class:" w-full h-9/10 flex justify-start z-10 backdrop-filter backdrop-blur-sm",children:Object(o.jsxs)("ul",{class:"z-30 bg-gray w-48 text-white space-y-2 px-4",children:[Object(o.jsx)("li",{class:"active",children:Object(o.jsx)("a",{href:"/concerts",class:"links",children:"Concerts"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"/users",class:"links",children:"Users"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"/favorites",class:"links",children:"Favorites"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"/myconcerts",class:"links",children:"Organizer Concerts"})}),Object(o.jsx)("li",{children:Object(o.jsx)("a",{href:"/mainpage",class:"links",children:"Home"})})]})})},u=s(4),d=function(e,t){var s=Object(n.useState)(""),c=Object(u.a)(s,2),r=c[0],a=c[1],i=Object(n.useState)(""),l=Object(u.a)(i,2),j=l[0],d=l[1];Object(n.useEffect)((function(){var t=localStorage.getItem("user");if(e){var s=JSON.parse(t);a(s?s.Username:""),d(s?s.UserRole:"")}else a("")}),[localStorage.getItem("user"),e]);return Object(o.jsxs)("div",{class:"flex flex-row justify-evenly items-center bg-gray h-1/10 w-full text-white",children:[Object(o.jsx)("button",{class:"text-purple text-4xl font-bold",children:Object(o.jsx)("svg",{className:" w-6 h-6 text-white hover:text-purple ",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",viewBox:"0 0 24 24",stroke:"currentColor",onClick:function(){document.querySelector(".mobile-menu").classList.toggle("hidden")},children:Object(o.jsx)("path",{d:"M4 6h16M4 12h16M4 18h16"})})}),Object(o.jsx)("div",{class:"text-purple text-4xl font-bold",children:"CONCERTS"}),Object(o.jsxs)("div",{class:"text-white",children:["User: ",r,"(",j,")"]}),Object(o.jsx)("div",{class:"links",onClick:function(){localStorage.setItem("user",JSON.stringify(null)),window.location.assign("../")},children:"Logout"})]})},b=s(8),f=s(6),x=s(3),h=s.n(x),p=s(7),O=function(){var e=Object(p.a)(h.a.mark((function e(t){var s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/login",{method:"POST",body:JSON.stringify({name:t.username,password:t.password}),headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()}));case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(p.a)(h.a.mark((function e(t){var s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getUser",{method:"POST",body:JSON.stringify({id:t}),headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(e){return e.json()}));case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(p.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/createUser",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object(f.a)({},t))}).then((function(e){return e.json()}));case 2:return e.abrupt("return");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function v(){var e=Object(n.useState)({userinfo:{username:"",password:""}}),t=Object(u.a)(e,2),s=t[0],c=t[1];function r(e){var t=e.target,n=t.name,r=t.value;c(Object(f.a)(Object(f.a)({},s),{},{userinfo:Object(f.a)(Object(f.a)({},s.userinfo),{},Object(b.a)({},n,r))}))}return Object(o.jsx)("div",{class:"basic_page flex justify-center items-center",children:Object(o.jsx)("div",{class:"w-full max-w-xs",children:Object(o.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log(s),O(s.userinfo).then((function(e){return function(e,t){1===e.length?(console.log(e),document.getElementById("wrong_data").classList.add("hidden"),localStorage.setItem("user",JSON.stringify(e[0])),window.location.assign("/mainpage")):(console.log("Wrong password"),document.getElementById("wrong_data").classList.remove("hidden"))}(e)})).catch((function(e){alert("Login failed: "+e)}))},class:"form_theme",children:[Object(o.jsxs)("div",{class:"mb-4",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"username",children:"Username"}),Object(o.jsx)("input",{name:"username",label:"username",class:"input_fields",type:"text",onChange:r})]}),Object(o.jsxs)("div",{class:"mb-6",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"password",children:"Password"}),Object(o.jsx)("input",{name:"password",label:"password",class:"  input_fields",type:"password",onChange:r})]}),Object(o.jsx)("div",{id:"wrong_data",class:"text-red-500 text-xs hidden mb-3",children:"Wrong username or password"}),Object(o.jsxs)("div",{class:"flex items-center justify-between",children:[Object(o.jsx)("button",{class:"buttons",type:"submit",value:"Login",children:"Sign In"}),Object(o.jsx)("a",{href:"/register",class:"buttons",type:"button",children:"Register"})]})]})})})}var w=s(12),y=s(13),S=s(16),_=s(14),C=function(e){e.user;var t=e.onSubmit,s=e.onChange;e.errors;return Object(o.jsx)("div",{class:"basic_page flex justify-center items-center",children:Object(o.jsxs)("form",{class:"w-full max-w-lg form_theme",onSubmit:t,children:[Object(o.jsxs)("div",{class:"flex flex-wrap -mx-3 mb-6",children:[Object(o.jsxs)("div",{class:"w-full md:w-1/2 px-3 mb-3",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-first-name",children:"First Name"}),Object(o.jsx)("input",{onChange:s,name:"name",class:"input_fields",type:"text"})]}),Object(o.jsxs)("div",{class:"w-full md:w-1/2 px-3 mb-3",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-last-name",children:"Last Name"}),Object(o.jsx)("input",{onChange:s,name:"surname",class:"input_fields",type:"text"})]})]}),Object(o.jsx)("div",{class:"flex flex-wrap -mx-3 mb-6",children:Object(o.jsxs)("div",{class:"w-full px-3",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-username",children:"Username"}),Object(o.jsx)("input",{onChange:s,name:"username",class:"block input_fields focus:border-gray-500",type:"text"})]})}),Object(o.jsx)("div",{class:"flex flex-wrap -mx-3 mb-6",children:Object(o.jsxs)("div",{class:"w-full px-3",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-password",children:"Password"}),Object(o.jsx)("input",{onChange:s,name:"password",class:"block input_fields",type:"password"})]})}),Object(o.jsxs)("div",{class:"flex flex-wrap -mx-3 mb-2",children:[Object(o.jsxs)("div",{class:"w-full md:w-1/2 px-3 mb-6 ",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-email",children:"Email"}),Object(o.jsx)("input",{onChange:s,name:"email",class:"input_fields",type:"text"})]}),Object(o.jsxs)("div",{class:"w-full md:w-1/2 px-3 mb-6 ",children:[Object(o.jsx)("label",{class:"input_field_titles",for:"grid-role",children:"Role"}),Object(o.jsxs)("div",{class:"relative",children:[Object(o.jsxs)("select",{onChange:s,name:"role",class:"input_fields",children:[Object(o.jsx)("option",{children:"Pick a role"}),Object(o.jsx)("option",{children:"Admin"}),Object(o.jsx)("option",{children:"Event Organizer"}),Object(o.jsx)("option",{children:"User"})]}),Object(o.jsx)("div",{class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:Object(o.jsx)("svg",{class:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:Object(o.jsx)("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})})})]})]}),Object(o.jsxs)("div",{class:"flex items-center justify-between px-3 mb-6 w-full",children:[Object(o.jsx)("a",{href:"/",class:"buttons",children:"Cancel"}),Object(o.jsx)("button",{type:"submit",class:"buttons",children:"Register"})]})]})]})})},k=function(e){Object(S.a)(s,e);var t=Object(_.a)(s);function s(){var e;Object(w.a)(this,s);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={user:{id:"",name:"",surname:"",username:"",password:"",email:"",role:""}},e.updateInfo=function(t){var s=t.target,n=s.name,c=s.value,r=Object(f.a)(Object(f.a)({},e.state.user),{},Object(b.a)({},n,c));e.setState({user:r})},e.handleSubmit=function(){var t=Object(p.a)(h.a.mark((function t(s){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:s.preventDefault(),g(e.state.user).then((function(e){console.log(e),window.location.assign("../")})).catch((function(e){alert("Register failed: "+e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(y.a)(s,[{key:"render",value:function(){return Object(o.jsx)(C,{user:this.state.user,onSubmit:this.handleSubmit,onChange:this.updateInfo})}}]),s}(c.a.Component),L=k,I=function(){return Object(o.jsx)("h1",{class:"py-40 text-black",children:"Oops! page not found."})},N=function(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),s=t[0],c=t[1];return Object(n.useEffect)((function(){JSON.parse(localStorage.getItem("user"))&&m(JSON.parse(localStorage.getItem("user"))._id).then((function(e){c(e[0].notifications)})).catch((function(e){alert("Loading favorites of current user failed: "+e)}))})),Object(o.jsx)("div",{class:"bg-gray flex justify-center h-9/10 w-full text-white",children:Object(o.jsxs)("div",{class:"mt-20 w-80 h-132 overflow-y-auto",children:[Object(o.jsx)("div",{class:"text-4xl text-center",children:"Notification Center"}),Object(o.jsx)("div",{class:"text-center pt-4",children:s.split(",").map((function(e){return Object(o.jsxs)("p",{class:"py-2",children:[e,Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)("hr",{class:"bg-purple text-purple"})]})}))})]})})};function J(){return Object(o.jsx)(i.a,{class:"h-screen",children:Object(o.jsxs)("div",{class:"container-fluid h-screen",children:[Object(o.jsx)(d,{}),Object(o.jsx)("div",{class:"fixed z-30 hidden mobile-menu h-full w-full",children:Object(o.jsx)(j,{})}),Object(o.jsxs)(l.c,{class:"h-4/5 w-screen",children:[Object(o.jsx)(l.a,{exact:!0,path:"/",element:Object(o.jsx)(v,{})}),Object(o.jsx)(l.a,{path:"/register",element:Object(o.jsx)(L,{})}),Object(o.jsx)(l.a,{path:"/mainpage",element:Object(o.jsx)(N,{})}),Object(o.jsx)(l.a,{element:Object(o.jsx)(I,{})})]})]})})}var T=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,25)).then((function(t){var s=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;s(e),n(e),c(e),r(e),a(e)}))};a.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(J,{})}),document.getElementById("root")),T()}},[[24,1,2]]]);
//# sourceMappingURL=main.bc7c58c5.chunk.js.map