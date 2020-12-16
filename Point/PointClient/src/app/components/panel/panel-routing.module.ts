import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AdminGuard } from './../../services/admin.guard';
import { EmployeeGuard } from './../../services/employee.guard';
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
  { path: 'car-models', component: CarModelsComponent , canActivate:[AdminGuard]},
  { path: 'car-models/new', component: NewCarModelComponent , canActivate:[AdminGuard] },
  { path: 'car-models/update/:id', component: UpdateCarModelComponent , canActivate:[AdminGuard]},
  { path: 'fleet-vehicle', component: FleetVehicleComponent , canActivate:[AdminGuard]},
  { path: 'fleet-vehicle/new', component: NewCarComponent , canActivate:[AdminGuard]},
  { path: 'fleet-vehicle/update/:carID', component: UpdateCarComponent , canActivate:[AdminGuard]},
  { path: 'reservation', component: ReservationsComponent , canActivate:[AdminGuard]},
  { path: 'users', component: UsersComponent , canActivate:[AdminGuard]},
  { path: 'users/update/:userID', component: UpdateUserComponent , canActivate:[AdminGuard]},

  {
    path: '', component: CarModelsComponent
  }
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
