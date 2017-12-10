import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(
            routes,
            { enableTracing: true } // <-- debugging purposes only
    )],
    exports: [ RouterModule ],
    providers: []  //添加路由守卫时需要将守卫服务添加到providers中
})

export class AppRoutingModule{
}