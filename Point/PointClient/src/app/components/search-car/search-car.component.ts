import { CarModelsService } from 'src/app/services/car-models.service';
import { FleetVehiclesService } from './../../services/fleet-vehicles.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { store } from 'src/app/redux/store';
import { CarCategoryModel, CarsModel, FleetVehiclesModel } from './models/cars.model';
import { Unsubscribe } from 'redux';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit, OnDestroy {
  public fleetVehicles: FleetVehiclesModel[];
  public fleetVehiclesToShow: FleetVehiclesModel[];
  public car: FleetVehiclesModel;

  categories: CarCategoryModel[];
  carCategory: CarCategoryModel;

  carsModels: CarsModel[];
  carModel: CarsModel;
  private unsubscribe: Unsubscribe;

  searchText: string;
  catID: number;
  yearID: number;
  gearboxID: number;
  manufacturerID: number;
  carModelID: number;
  startDate: Date;
  endDate: Date;

  constructor(
    private modalService: NgbModal,
    private fleetVehiclesServices: FleetVehiclesService,
    private categoriesService: CategoriesService,
    private carModelsService: CarModelsService

  ) { }

  async ngOnInit() {


    this.categories = await this.categoriesService.getAllCategories();
    await this.carModelsService.loadCarsModels();
    this.carsModels = store.getState().carsModels;

    this.unsubscribe = store.subscribe(() => {
      this.fleetVehicles = store.getState().fleetVehicles;
      this.fleetVehicles.forEach(car => {
        car.carModel = this.findCarModel(car.modelID)
        car.carModel.cModelCat = this.findCarCategory(car.carModel.cModelCatID);
      });
      this.fleetVehiclesToShow = this.fleetVehicles;
    });

    if (store.getState().fleetVehicles.length > 0) {
      this.fleetVehicles = store.getState().fleetVehicles;
      this.fleetVehiclesToShow = this.fleetVehicles;
    }
    else {
      await this.fleetVehiclesServices.loadFleetVehicles();
    }

    console.log('fleetVehicles', this.fleetVehicles);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }


  open(content, id) {
    this.car = this.fleetVehicles.find(c => c.id === id);
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log(result);
      }, reason => {
        console.log(reason);
      });
  }
  findCarCategory(id: number): CarCategoryModel {
    return this.categories.find(c => c.catID === id);
  }
  findCarModel(id: number): CarsModel {
    return this.carsModels.find(c => c.cModelID === id);
  }

  public saveStorage(car): void {
    sessionStorage.setItem("reservation", JSON.stringify(car));
    localStorage.setItem("reservation", JSON.stringify(car));
  }
  public filterCategories(): void {
    this.fleetVehiclesToShow = this.fleetVehicles.filter(c => c.carModel.cModelCatID === this.catID);
  }
  public filterByYear(): void {
    this.fleetVehiclesToShow = this.fleetVehicles.filter(c => c.carYear === this.yearID.toString());
  }
  public filterByGearbox(): void {
    this.fleetVehiclesToShow = this.fleetVehicles.filter(c => c.gearbox === this.gearboxID.toString());
  }
  public filterByManufacturer(): void {
    this.fleetVehiclesToShow = this.fleetVehicles.filter(c => c.carModel.cModelManufacturer === this.manufacturerID.toString());
  }
  public filterByCarModel(): void {
    this.fleetVehiclesToShow = this.fleetVehicles.filter(c => c.carModel.cModelName === this.carModelID.toString());
  }
  public filterByStartDate(): void {
  }
  public filterByEndDate(): void {
  }
  public clear() {
    this.catID = 0;
    this.yearID = 0;
    this.gearboxID = 0;
    this.manufacturerID = 0;
    this.carModelID = 0;
    this.fleetVehiclesToShow = this.fleetVehicles;
  }
}
