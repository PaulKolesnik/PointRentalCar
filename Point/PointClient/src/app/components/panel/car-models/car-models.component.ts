import { Unsubscribe } from 'redux';
import { CarModelsService } from './../../../services/car-models.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarsModel } from '../../search-car/models/cars.model';
import { store } from 'src/app/redux/store';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.scss']
})
export class CarModelsComponent implements OnInit, OnDestroy {

  public carsModels: CarsModel[];
  public carModel: CarsModel;
  private unsubscribe: Unsubscribe;
  public pageSizes = [
    { id: 1, number: 5 },
    { id: 2, number: 10 },
    { id: 3, number: 25 },
    { id: 4, number: 50 }
  ];
  public selectedPage: number = this.pageSizes[0].number;

  page = 1;
  constructor(
    private modalService: NgbModal,
    private carModelService: CarModelsService
  ) { }

  async ngOnInit() {

    this.unsubscribe = store.subscribe(() => {
      this.carsModels = store.getState().carsModels;
    });

    if (store.getState().carsModels.length > 0) {
      this.carsModels = store.getState().carsModels;
    }
    else {
      await this.carModelService.loadCarsModels();
    }

    console.log('cars models->', this.carsModels);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }



  open(content, id: number) {
    this.findCarModel(id);
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log('hey');
        console.log(result);
      }, reason => {
        console.log(reason);
        console.log('bey');
      });
  }

  public findCarModel(id: number): void {
    this.carModel = this.carsModels.find(c => c.cModelID === id);
  }
  public async deleteCarModel(id: number) {
    try {
      const answer = confirm("Are you sure you want to delete?");
      if (!answer)
        return;


      await this.carModelService.DeleteCarModel(id);
      // setTimeout(() => {

      // }, 600);
      var notyf = new Notyf();
      notyf.success('Car Model has been deleted!');
    }
    catch (err) {
      console.log(err.message);
    }
  }

}
