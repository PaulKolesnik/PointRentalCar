import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { SearchCarRoutingModule } from './search-car-routing.module';
import { SearchCarComponent } from './search-car.component';


@NgModule({
  declarations: [SearchCarComponent],

  imports: [
    CommonModule,
    SearchCarRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HeaderModule,
    FooterModule,
    MenuModule,
  ]
})
export class SearchCarModule { }
