import { ReservationComponent } from './reservation/reservation.component';
import { LoginGuard } from './../../services/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCarComponent } from './search-car.component';


const routes: Routes= [
  {
    path: 'search-car/', component: SearchCarComponent
  },
  {
    path: 'order/:id', component: ReservationComponent, canActivate: [LoginGuard]
  },
  { path: '', component: SearchCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SearchCarRoutingModule { }
