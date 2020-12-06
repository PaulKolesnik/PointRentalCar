import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { FooterModule } from '../footer/footer.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    MenuModule
  ]
})
export class HomeModule { }
