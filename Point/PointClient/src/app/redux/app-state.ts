import { CarsModel, FleetVehiclesModel } from './../components/search-car/models/cars.model';
export class AppState {

  public carsModels: CarsModel[];
  public carsModel: CarsModel;
  public fleetVehicles: FleetVehiclesModel[];
  public oneCarFromFleet: FleetVehiclesModel;
  public users;
  public categories;

  public constructor() {
    this.carsModels = [];
    this.fleetVehicles = [];
  }

}
