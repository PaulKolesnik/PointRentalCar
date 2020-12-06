import { HeaderModule } from './../header/header.module';
import { FooterComponent } from './footer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
  ],
  exports: [FooterComponent
  ]
})
export class FooterModule { }
