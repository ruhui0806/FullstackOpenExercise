(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var r=t(16),c=t.n(r),o=t(3),a=t(1),u=t(4),i=t.n(u),s="https://phone-book-backend-app.herokuapp.com/api/persons",d={getAll:function(){return i.a.get(s).then((function(e){return e.data}))},create:function(e){return i.a.post(s,e).then((function(e){return e.data}))},remove:function(e){return i.a.delete("".concat(s,"/").concat(e.id)).then((function(e){return e.data}))},update:function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))}},l=t(0),h=function(e){var n=e.person,t=e.handleDelete;return Object(l.jsxs)("div",{children:[n.name," ",n.number,Object(l.jsx)("button",{onClick:function(){return t(n.id)},children:" delete "})]})},b=function(e){return Object(l.jsx)("div",{children:e.persons.map((function(n,t){return Object(l.jsx)(h,{person:n,handleDelete:e.handleDelete},t)}))})},j=function(e){return 0===e.input.length?Object(l.jsxs)(l.Fragment,{children:["filter shown with ",Object(l.jsx)("input",{type:"text",value:e.input,onChange:e.handlePersonShow})," "]}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)(l.Fragment,{children:["filter shown with ",Object(l.jsx)("input",{type:"text",value:e.input,onChange:e.handlePersonShow})," "]}),Object(l.jsxs)(l.Fragment,{children:[e.personsToshow.map((function(e){return Object(l.jsx)(h,{person:e},e.id)}))," "]})]})},f=function(e){return Object(l.jsxs)("form",{onSubmit:e.addPerson,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var n=e.message,t=e.errorOccured;return null===n?null:!1===t?Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:[n,Object(l.jsx)("br",{})]}):Object(l.jsxs)("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:[n,Object(l.jsx)("br",{}),Object(l.jsx)("br",{})]})},O=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),u=Object(o.a)(c,2),i=u[0],s=u[1],h=Object(a.useState)(""),O=Object(o.a)(h,2),p=O[0],g=O[1],x=Object(a.useState)(!1),v=Object(o.a)(x,2),w=v[0],S=v[1],y=Object(a.useState)(""),C=Object(o.a)(y,2),k=C[0],N=C[1],T=Object(a.useState)(null),D=Object(o.a)(T,2),P=D[0],F=D[1],A=Object(a.useState)(!1),B=Object(o.a)(A,2),I=B[0],z=B[1];Object(a.useEffect)((function(){d.getAll().then((function(e){r(e)}))}),[]);var E=w?t:t.filter((function(e){return!0===e.name.toLowerCase().includes(p.toLowerCase())}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(m,{message:P,errorOccured:I}),Object(l.jsx)(j,{input:p,handlePersonShow:function(e){g(e.target.value),S(!1)},personsToshow:E}),Object(l.jsx)("h2",{children:"add a new"}),Object(l.jsx)(f,{addPerson:function(e){e.preventDefault();var n={name:i,number:k},c=t.filter((function(e){return e.name===i}));if(0!==c.length){var o=t.findIndex((function(e){return e.name===i})),a=t[o].id;window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))?(d.update(a,n).then((function(e){r(t.map((function(n){return n.id!==a?n:e}))),F("the ".concat(e.name,"'s information is updated")),setTimeout((function(){F(null)}),3e3)})).catch((function(e){console.log(e),z(!0),F("Information of ".concat(n.name," has already been removed from the server"))})),setTimeout((function(){F(null)}),5e3),setTimeout((function(){return z(!1)}),5e3)):(F("the updation for ".concat(n.name,"'s number has been canceled")),setTimeout((function(){F(null)}),3e3))}else 0===c.length&&d.create(n).then((function(e){r(t.concat(e))})).then(F("Add ".concat(i))).then(setTimeout((function(){F(null)}),3e3));s(""),N("")},newName:i,newNumber:k,handleNameChange:function(e){s(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(b,{persons:t,handleDelete:function(e){var n=t.filter((function(n){return n.id===e}))[0];window.confirm("Delete ".concat(n.name," ?"))?d.remove(n).then(r(t.filter((function(n){return n.id!==e})))).then(F("".concat(n.name," has just been deleted"))).then(setTimeout((function(){return F(null)}),3e3)):F("".concat(n.name," will not be deleted yet")),setTimeout((function(){return F(null)}),3e3)}})]})};c.a.render(Object(l.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.6887e967.chunk.js.map