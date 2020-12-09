import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { CarModelsComponent } from './car-models/car-models.component';
import { NewCarModelComponent } from './car-models/new-car-model/new-car-model.component';
import { UpdateCarModelComponent } from './car-models/update-car-model/update-car-model.component';
import { FleetVehicleComponent } from './fleet-vehicle/fleet-vehicle.component';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    PanelComponent,
    CarModelsComponent,
    UsersComponent,
    ReservationsComponent,
    FleetVehicleComponent,
    NewCarModelComponent,
    UpdateCarModelComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    MenuModule,
    NgSelectModule,
  ]
})
export class PanelManagementModule { }
