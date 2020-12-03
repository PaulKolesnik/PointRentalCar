import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { SearchCarComponent } from './components/search-car/search-car.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "search-car", component: SearchCarComponent },
  { path: "order", component: OrderComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: HomeComponent },
  { path: "login", component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", loadChildren: () => import("./components/home/home.component").then(m => m.HomeComponent) } // Must be the last route!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
