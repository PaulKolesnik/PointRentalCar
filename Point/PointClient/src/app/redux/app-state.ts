import { UserModel } from './../models/user-model';
import { CarsModel, FleetVehiclesModel } from './../components/search-car/models/cars.model';
export class AppState {

  public carsModels: CarsModel[];
  public carsModel: CarsModel;

  public fleetVehicles: FleetVehiclesModel[];
  public oneCarFromFleet: FleetVehiclesModel;

  public users: UserModel[];
  public user: UserModel = null;
  public categories;

  public constructor() {
    this.carsModels = [];
    this.fleetVehicles = [];
    this.users = [];
    this.user = JSON.parse(sessionStorage.getItem("user"));
    // this.user = JSON.parse(localStorage.getItem("user"));
  }

}
