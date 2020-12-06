
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarModelsComponent } from './car-models/car-models.component';
import { FleetVehicleComponent } from './fleet-vehicle/fleet-vehicle.component';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [
    PanelComponent,
    CarModelsComponent,
    UsersComponent,
    ReservationsComponent,
    FleetVehicleComponent
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
    MenuModule
  ]
})
export class PanelManagementModule { }
