(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var r=t(16),c=t.n(r),o=t(3),a=t(1),u=t(4),i=t.n(u),s="/api/persons",l={getAll:function(){return i.a.get(s).then((function(e){return e.data}))},create:function(e){return i.a.post(s,e).then((function(e){return e.data}))},remove:function(e){return i.a.delete("".concat(s,"/").concat(e.id)).then((function(e){return e.data}))},update:function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))}},d=t(0),h=function(e){var n=e.person,t=e.handleDelete;return Object(d.jsxs)("div",{children:[n.name," ",n.number,Object(d.jsx)("button",{onClick:function(){return t(n.id)},children:" delete "})]})},b=function(e){return Object(d.jsx)("div",{children:e.persons.map((function(n,t){return Object(d.jsx)(h,{person:n,handleDelete:e.handleDelete},t)}))})},j=function(e){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsxs)(d.Fragment,{children:["filter shown with ",Object(d.jsx)("input",{type:"text",value:e.input,onChange:e.handlePersonShow})," "]}),Object(d.jsxs)(d.Fragment,{children:[e.personsToshow.map((function(e){return Object(d.jsx)(h,{person:e},e.id)}))," "]})]})},f=function(e){return Object(d.jsxs)("form",{onSubmit:e.addPerson,children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(d.jsxs)("div",{children:["number: ",Object(d.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.message,t=e.errorOccured;return null===n?null:!1===t?Object(d.jsxs)("div",{style:{color:"green",fontStyle:"italic",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:[n,Object(d.jsx)("br",{})]}):Object(d.jsxs)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:[n,Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]})},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),u=Object(o.a)(c,2),i=u[0],s=u[1],h=Object(a.useState)(""),O=Object(o.a)(h,2),p=O[0],g=O[1],x=Object(a.useState)(!0),v=Object(o.a)(x,2),w=v[0],S=v[1],y=Object(a.useState)(""),T=Object(o.a)(y,2),C=T[0],N=T[1],k=Object(a.useState)(null),D=Object(o.a)(k,2),P=D[0],A=D[1],B=Object(a.useState)(!1),F=Object(o.a)(B,2),z=F[0],E=F[1];Object(a.useEffect)((function(){l.getAll().then((function(e){r(e)}))}),[]);var I=w?t.filter((function(e){return e.name===p})):t.filter((function(e){return!0===e.name.toLowerCase().includes(p.toLowerCase())}));return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(m,{message:P,errorOccured:z}),Object(d.jsx)(j,{input:p,handlePersonShow:function(e){g(e.target.value),S(!1)},personsToshow:I}),Object(d.jsx)("h2",{children:"add a new"}),Object(d.jsx)(f,{addPerson:function(e){e.preventDefault();var n={name:i,number:C},c=t.filter((function(e){return e.name===i}));if(0!==c.length){var o=t.findIndex((function(e){return e.name===i})),a=t[o].id;window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))?(l.update(a,n).then((function(e){r(t.map((function(n){return n.id!==a?n:e}))),A("the ".concat(e.name,"'s information is updated")),setTimeout((function(){A(null)}),3e3)})).catch((function(e){console.log(e),E(!0),A("Updation failed, due to one of the reasons: 1)information of ".concat(n.name," has already been removed from the server; 2) the number length ").concat(n.number.length," is less than 8 digits"))})),setTimeout((function(){A(null)}),1e4),setTimeout((function(){return E(!1)}),1e4)):(A("the updation for ".concat(n.name,"'s number has been canceled")),setTimeout((function(){A(null)}),3e3))}else 0===c.length&&l.create(n).then((function(e){r(t.concat(e))})).then(A("Add a new name: ".concat(i))).then(setTimeout((function(){A(null)}),3e3)).catch((function(e){console.log(e.response),E(!0),A("An error occurred: ".concat(e)),setTimeout((function(){A(null)}),5e3),setTimeout((function(){return E(!1)}),5e3)}));s(""),N("")},newName:i,newNumber:C,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),Object(d.jsx)("h2",{children:"Numbers"}),Object(d.jsx)(b,{persons:t,handleDelete:function(e){var n=t.filter((function(n){return n.id===e}))[0];window.confirm("Delete ".concat(n.name," ?"))?l.remove(n).then(r(t.filter((function(n){return n.id!==e})))).then(A("".concat(n.name," has just been deleted"))).then(setTimeout((function(){return A(null)}),3e3)):A("".concat(n.name," will not be deleted yet")),setTimeout((function(){return A(null)}),3e3)}})]})};c.a.render(Object(d.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.63f0cd86.chunk.js.map