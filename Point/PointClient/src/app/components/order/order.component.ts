import { Component, OnInit } from '@angular/core';
import { CarsService } from './../../services/cars.service';
import { CarsModel } from './../search-car/models/cars.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cars: CarsModel[];
  constructor(private carsService: CarsService) { }

  async ngOnInit() {
    await this.getCars();
    console.log(this.cars);

  }

  async getCars() {
    this.cars = await this.carsService.getAllCars();
    console.log(this.cars);
  }


}
