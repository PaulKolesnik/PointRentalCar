import { CarsModel, FleetVehiclesModel } from './../components/search-car/models/cars.model';
export class AppState {

  public carsModels: CarsModel[];
  public fleetVehicles: FleetVehiclesModel[];

  
  public constructor() {
    this.carsModels = [];
    this.fleetVehicles = [];
  }

}
