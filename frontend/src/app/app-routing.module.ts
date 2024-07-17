import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import { StComponent } from './st/st.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
   // {path: '', redirectTo:'/userlist', pathMatch: 'full'},
   { path: 'signup', component: SigninComponent }, 
   { path: 'login', component: LoginComponent}, 
   { path: 'student', component:StComponent,canActivate:[authGuard]}, 
   { path: 'stlist', component: StudentlistComponent,canActivate:[authGuard]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
