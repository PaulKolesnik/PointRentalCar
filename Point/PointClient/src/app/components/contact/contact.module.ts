import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { MenuModule } from '../menu/menu.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    MenuModule,
  ]
})
export class ContactModule { }
