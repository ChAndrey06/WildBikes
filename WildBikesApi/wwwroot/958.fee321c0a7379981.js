"use strict";(self.webpackChunkwild_bikes=self.webpackChunkwild_bikes||[]).push([[958],{8958:(U,a,t)=>{t.r(a),t.d(a,{USER_ROUTES:()=>v});var u=t(6294),f=t(6895),n=t(4006),g=t(4144),d=t(4859),s=t(9549),p=t(9431),o=t(4650),c=t(3060);function h(m,r){1&m&&(o.TgZ(0,"mat-error"),o._uU(1," Invalid credentials "),o.qZA())}class i{constructor(r,e,l,Z){this.authService=r,this.formBuilder=e,this.router=l,this.route=Z,this.loginError=!1,this.formGroup=this.formBuilder.group({login:[null,n.kI.required],password:[null,n.kI.required]})}onLoginSubmit(r){this.authService.login(r.login,r.password).subscribe({next:e=>{(0,p.M8)(e.accessToken),(0,p.zI)(e.refreshToken),this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl??"/")},error:()=>{this.loginError=!0,this.formGroup.reset()}})}}i.\u0275fac=function(r){return new(r||i)(o.Y36(u.e8),o.Y36(n.qu),o.Y36(c.F0),o.Y36(c.gz))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-login"]],standalone:!0,features:[o.jDz],decls:16,vars:3,consts:[[1,"container"],[1,"mat-h1"],[1,"form",3,"formGroup","ngSubmit"],[1,"form-element"],["matInput","","placeholder","Login","formControlName","login","autofocus",""],["matInput","","placeholder","Password","type","password","formControlName","password"],["mat-raised-button","","color","primary","type","submit",1,"button",3,"disabled"],[4,"ngIf"]],template:function(r,e){1&r&&(o.TgZ(0,"div",0)(1,"h1",1),o._uU(2,"Bali Wild Bikes"),o.qZA(),o.TgZ(3,"form",2),o.NdJ("ngSubmit",function(){return e.onLoginSubmit(e.formGroup.value)}),o.TgZ(4,"mat-form-field",3)(5,"mat-label"),o._uU(6,"Login"),o.qZA(),o._UZ(7,"input",4),o.qZA(),o.TgZ(8,"mat-form-field",3)(9,"mat-label"),o._uU(10,"Password"),o.qZA(),o._UZ(11,"input",5),o.qZA(),o.TgZ(12,"div",3)(13,"button",6),o._uU(14," Login "),o.qZA()(),o.YNc(15,h,2,0,"mat-error",7),o.qZA()()),2&r&&(o.xp6(3),o.Q6J("formGroup",e.formGroup),o.xp6(10),o.Q6J("disabled",!e.formGroup.valid),o.xp6(2),o.Q6J("ngIf",e.loginError))},dependencies:[f.ez,f.O5,n.UX,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,s.lN,s.KE,s.hX,s.TO,g.c,g.Nt,d.ot,d.lW],styles:[".container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column}.form[_ngcontent-%COMP%]{max-width:400px}.form-element[_ngcontent-%COMP%], form[_ngcontent-%COMP%], .button[_ngcontent-%COMP%]{width:100%}"]});const v=[{path:u.Wg.Login,component:i}]}}]);