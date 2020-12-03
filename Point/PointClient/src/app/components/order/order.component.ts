import { Component, OnInit } from '@angular/core';
import { CarsModel } from './../search-car/models/cars.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cars: CarsModel[];
  constructor() { }

   ngOnInit() {


  }





}
