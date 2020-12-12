import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchModel, CarsModel, FleetVehiclesModel } from 'src/app/components/search-car/models/cars.model';
import { store } from 'src/app/redux/store';
import { CarModelsService } from 'src/app/services/car-models.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { FleetVehiclesService } from 'src/app/services/fleet-vehicles.service';
import { Notyf } from 'notyf';
import { BranchesService } from 'src/app/services/branches.service';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {


  public carFromFleet: FleetVehiclesModel = new FleetVehiclesModel();

  carsModels: CarsModel[];
  selectedCarModelID: number;

  branches: BranchModel[];
  selectedBranchID: number;
  preview: string;
  year = new Date().getFullYear();

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
    private myActivatedRoute: ActivatedRoute,
    private carModelsService: CarModelsService,
    private branchesService: BranchesService,
    private fleetVehiclesService: FleetVehiclesService
  ) { }

  async ngOnInit() {
    const id = +this.myActivatedRoute.snapshot.params.carID;
    await this.fleetVehiclesService.getOneCarFromFleet(id);
    this.carFromFleet = store.getState().oneCarFromFleet;

    this.branches = await this.branchesService.getAllBranches();
    this.selectedBranchID = this.carFromFleet.branchID;

    await this.carModelsService.loadCarsModels();
    this.carsModels = store.getState().carsModels;
    this.selectedCarModelID = this.carFromFleet.modelID;
    console.log('car', this.carFromFleet
    );
  }

  public async updateCar() {
    this.carFromFleet.branchID = this.selectedBranchID;
    this.carFromFleet.modelID = this.selectedCarModelID;

    console.log(this.carFromFleet);
    this.carFromFleet.carModel = this.carsModels.find(c => c.cModelID === this.selectedCarModelID);
    this.carFromFleet.branch = this.branches.find(b => b.branchID === this.selectedBranchID);
    this.carFromFleet.mileage = this.carFromFleet.mileage.toString();
    this.carFromFleet.carImg = null;
    await this.fleetVehiclesService.UpdateCarFromFleet(this.carFromFleet.id, this.carFromFleet)
    var notyf = new Notyf();
    notyf.success('Your have successfully updated!');
  }

  public displayPreview(image: File) {
    this.carFromFleet.carImg = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.preview = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }
}


