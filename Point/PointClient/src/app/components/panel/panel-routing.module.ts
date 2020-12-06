import { ReservationsComponent } from './reservations/reservations.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CarModelsComponent } from './car-models/car-models.component';
import { FleetVehicleComponent } from './fleet-vehicle/fleet-vehicle.component';
import { PanelComponent } from './panel.component';
import { UsersComponent } from './users/users.component';

export const portalChildrenRouts: Route[] = [
  { path: 'car-models', component: CarModelsComponent},
  { path: 'fleet-vehicle', component: FleetVehicleComponent},
  { path: 'reservation', component: ReservationsComponent},
  { path: 'users', component: UsersComponent},
];



const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: portalChildrenRouts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
