import { JwtInterceptorService } from './../../services/jwt-interceptor.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NewCarComponent } from './fleet-vehicle/new-car/new-car.component';
import { UpdateCarComponent } from './fleet-vehicle/update-car/update-car.component';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ReturnCarComponent } from './return-car/return-car.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    PanelComponent,
    CarModelsComponent,
    UsersComponent,
    ReservationsComponent,
    FleetVehicleComponent,
    NewCarModelComponent,
    UpdateCarModelComponent,
    NewCarComponent,
    UpdateCarComponent,
    UpdateUserComponent,
    ReturnCarComponent,
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
    MatRadioModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ]
})
export class PanelManagementModule { }
