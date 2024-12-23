"use strict";(self.webpackChunkangular_app=self.webpackChunkangular_app||[]).push([[325],{325:(k,d,a)=>{a.r(d),a.d(d,{BookFormModule:()=>p});var m=a(177),l=a(1069),s=a(4341),o=a(4438),c=a(2536),g=a(671);let b=(()=>{class i{bookService;router;route;authService;book={id:0,title:"",author:"",publishDate:""};isEditMode=!1;constructor(r,e,t,u){this.bookService=r,this.router=e,this.route=t,this.authService=u}ngOnInit(){if(this.authService.isAuthenticated()){const r=this.route.snapshot.params.id;r&&(this.isEditMode=!0,this.bookService.getBook(+r).subscribe(e=>{this.book=e,this.book.publishDate=this.formatDate(e.publishDate)}))}else this.router.navigate(["/login"])}formatDate(r){return r.split("T")[0]}onSubmit(){this.book.title.trim()&&this.book.author.trim()&&this.book.publishDate.trim()?this.isEditMode?this.bookService.updateBook(this.book).subscribe(()=>{this.router.navigate(["/book-list"])}):this.bookService.addBook(this.book).subscribe(()=>{this.router.navigate(["/book-list"])}):alert("All fields are required.")}static \u0275fac=function(e){return new(e||i)(o.rXU(c.l),o.rXU(l.Ix),o.rXU(l.nX),o.rXU(g.u))};static \u0275cmp=o.VBU({type:i,selectors:[["app-book-form"]],standalone:!0,features:[o.aNF],decls:18,vars:5,consts:[[1,"container","book-form-container","mt-3"],[1,"text-center"],[3,"ngSubmit"],[1,"form-group","mb-3"],["for","title"],["type","text","id","title","name","title","required","",1,"form-control",3,"ngModelChange","ngModel"],["for","author"],["type","text","id","author","name","author","required","",1,"form-control",3,"ngModelChange","ngModel"],["for","publishDate"],["type","date","id","publishDate","name","publishDate","required","",1,"form-control",3,"ngModelChange","ngModel"],["type","submit",1,"btn","btn-primary","w-100"]],template:function(e,t){1&e&&(o.j41(0,"div",0)(1,"h2",1),o.EFF(2),o.k0s(),o.j41(3,"form",2),o.bIt("ngSubmit",function(){return t.onSubmit()}),o.j41(4,"div",3)(5,"label",4),o.EFF(6,"Titel:"),o.k0s(),o.j41(7,"input",5),o.mxI("ngModelChange",function(n){return o.DH7(t.book.title,n)||(t.book.title=n),n}),o.k0s()(),o.j41(8,"div",3)(9,"label",6),o.EFF(10,"F\xf6rfattare:"),o.k0s(),o.j41(11,"input",7),o.mxI("ngModelChange",function(n){return o.DH7(t.book.author,n)||(t.book.author=n),n}),o.k0s()(),o.j41(12,"div",3)(13,"label",8),o.EFF(14,"Publiceringsdatum:"),o.k0s(),o.j41(15,"input",9),o.mxI("ngModelChange",function(n){return o.DH7(t.book.publishDate,n)||(t.book.publishDate=n),n}),o.k0s()(),o.j41(16,"button",10),o.EFF(17),o.k0s()()()),2&e&&(o.R7$(2),o.JRh(t.isEditMode?"Redigera bok":"L\xe4gg till ny bok"),o.R7$(5),o.R50("ngModel",t.book.title),o.R7$(4),o.R50("ngModel",t.book.author),o.R7$(4),o.R50("ngModel",t.book.publishDate),o.R7$(2),o.JRh(t.isEditMode?"Uppdater\u0430":"L\xe4gg till"))},dependencies:[s.YN,s.qT,s.me,s.BC,s.cb,s.YS,s.vS,s.cV,m.MD],styles:[".book-form-container[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:1em;border:1px solid #ccc;border-radius:5px}.book-form-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center}.book-form-container[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:1em}.book-form-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:.5em}.book-form-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:.5em;box-sizing:border-box}.book-form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:.5em;background-color:#007bff;color:#fff;border:none;border-radius:5px;cursor:pointer}.book-form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background-color:#0056b3}@media (max-width: 768px){.book-form-container[_ngcontent-%COMP%]{padding:.5em}.book-form-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:.75em}}"]})}return i})();const h=[{path:"",component:b},{path:":id",component:b}];let p=(()=>{class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=o.$C({type:i});static \u0275inj=o.G2t({imports:[m.MD,l.iI.forChild(h)]})}return i})()}}]);