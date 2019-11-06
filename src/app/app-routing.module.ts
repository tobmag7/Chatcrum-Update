import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChangeroleComponent } from './changerole/changerole.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { AuthGuard } from './auth.guard';
import { ChangeroleGuard } from './changerole.guard';


const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'scrumboard/:project_id', component: ScrumboardComponent, canActivate:[AuthGuard]},
  { path: 'createproject', component: CreateprojectComponent},
  { path: 'changerole/:project_id', component: ChangeroleComponent, canActivate: [ AuthGuard, ChangeroleGuard ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
