import { LoginComponent } from './components/register-login/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register-login/register/register.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "search-car", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", loadChildren: () => import("./components/home/home.component").then(m => m.HomeComponent) } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
