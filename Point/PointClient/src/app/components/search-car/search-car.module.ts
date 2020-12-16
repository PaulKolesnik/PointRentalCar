import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { SearchCarRoutingModule } from './search-car-routing.module';
import { SearchCarComponent } from './search-car.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReservationComponent } from './reservation/reservation.component';


@NgModule({
  declarations: [
    SearchCarComponent,
    ReservationComponent],

  imports: [
    CommonModule,
    SearchCarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HeaderModule,
    FooterModule,
    MenuModule,
    NgSelectModule,
    Ng2SearchPipeModule
  ]
})
export class SearchCarModule { }
