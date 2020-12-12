import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterModule } from './../footer/footer.module';
import { HeaderModule } from './../header/header.module';
import { PanelRoutingModule } from './../panel/panel-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    MenuModule,
    NgSelectModule,
    MatRadioModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
