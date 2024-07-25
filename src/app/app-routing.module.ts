import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"home",component:HomePageComponent,canActivate: [AuthGuard]},
  {path:"auth",component:AuthPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
