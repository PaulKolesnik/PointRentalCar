import { UpdateCarModelComponent } from './car-models/update-car-model/update-car-model.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { CarModelsComponent } from './car-models/car-models.component';
import { FleetVehicleComponent } from './fleet-vehicle/fleet-vehicle.component';
import { PanelComponent } from './panel.component';
import { UsersComponent } from './users/users.component';
import { NewCarModelComponent } from './car-models/new-car-model/new-car-model.component';
import { NewCarComponent } from './fleet-vehicle/new-car/new-car.component';
import { UpdateCarComponent } from './fleet-vehicle/update-car/update-car.component';

export const portalChildrenRouts: Route[] = [
  { path: 'car-models', component: CarModelsComponent},
  { path: 'car-models/new', component: NewCarModelComponent},
  { path: 'car-models/update/:id', component: UpdateCarModelComponent},
  { path: 'fleet-vehicle', component: FleetVehicleComponent},
  { path: 'fleet-vehicle/new', component: NewCarComponent},
  { path: 'fleet-vehicle/update/:carID', component: UpdateCarComponent},
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
