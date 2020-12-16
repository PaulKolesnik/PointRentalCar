import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from './app-constants';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  // { path: AppConstants.appRoutes.home, component: HomeComponent },
  {
    path: AppConstants.appRoutes.home,
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: AppConstants.appRoutes.register,
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: AppConstants.appRoutes.login,
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  { path: AppConstants.appRoutes.logout, component: LogoutComponent },
  {
    path: AppConstants.appRoutes.searchCar,
    loadChildren: () => import('./components/search-car/search-car.module').then(m => m.SearchCarModule)
  },
  {
    path: AppConstants.appRoutes.contact,
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: AppConstants.appRoutes.panel,
    loadChildren: () => import('./components/panel/panel-management.module').then(m => m.PanelManagementModule)
  },
  { path: "", redirectTo: '/home', pathMatch: "full" },
  { path: "**", component: HomeComponent } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
