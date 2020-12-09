import { BranchesService } from './../../../../services/branches.service';
import { store } from './../../../../redux/store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchModel, CarsModel, FleetVehiclesModel } from 'src/app/components/search-car/models/cars.model';
import { CarModelsService } from 'src/app/services/car-models.service';
import { FleetVehiclesService } from 'src/app/services/fleet-vehicles.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.scss']
})
export class NewCarComponent implements OnInit {

  public carModels: CarsModel[];
  public branches: BranchModel[];
  public selectedCarModelID: number;
  public selectedBranchID: number;
  public year = new Date().getFullYear();
  public newCarToFleet: FleetVehiclesModel = new FleetVehiclesModel();

  form: FormGroup = new FormGroup({
    vin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    color: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
    purchaseDate: new FormControl('', Validators.required),
    carYear: new FormControl('', Validators.compose([Validators.required, Validators.min(2010), Validators.max(this.year)])),
    mileage: new FormControl('', Validators.required),
    carImg: new FormControl('', Validators.required),
    gearbox: new FormControl('', Validators.required),
    toUsed: new FormControl('', Validators.required),
    carFixed: new FormControl('', Validators.required),
    branches: new FormControl('1', Validators.required),
    carModels: new FormControl('1', Validators.required),
  });

  constructor(
    private carModelService: CarModelsService,
    private branchesService: BranchesService,
    private fleetVehiclesService: FleetVehiclesService,
    private myRouter: Router
  ) { }

  async ngOnInit() {
    // get all cars models
    await this.carModelService.loadCarsModels();
    this.carModels = store.getState().carsModels;
    this.carModels.forEach( carModel => {
      carModel.fullName = carModel.cModelManufacturer + ' ' + carModel.cModelName;
    });
    this.selectedCarModelID = this.carModels[0].cModelID;
    // get all branches
    this.branches = await this.branchesService.getAllBranches();
    this.selectedBranchID = this.branches[0].branchID;
  }

  onSubmit() {
    this.newCarToFleet.modelID = this.selectedCarModelID;
    this.newCarToFleet.branchID = this.selectedBranchID;
    this.newCarToFleet.carYear = this.newCarToFleet.carYear.toString();
    this.newCarToFleet.mileage = this.newCarToFleet.mileage.toString();
    console.log('car', this.newCarToFleet);

    this.fleetVehiclesService.addCarToFleet(this.newCarToFleet);
    this.newCarToFleet.carModel = this.carModels.find(cm => cm.cModelID === this.selectedCarModelID);
    this.newCarToFleet.branch = this.branches.find(b => b.branchID === this.selectedBranchID);
    var notyf = new Notyf();
    notyf.success('Your have successfully added!');

    // setTimeout(() => {
    //   this.myRouter.navigateByUrl("/panel/fleet-vehicle");

    // }, 3000);


  }
}
