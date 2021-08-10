import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'auth', component: AuthComponent},
  {path:'home',component:HomeComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
