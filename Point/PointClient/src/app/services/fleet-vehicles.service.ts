import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FleetVehiclesModel } from '../components/search-car/models/cars.model';
import { ActionType } from '../redux/action-type';
import { Action } from '../redux/action';
import { store } from '../redux/store';
import { ConfigurationService } from './configuration/configuration.service';
@Injectable({
  providedIn: 'root'
})
export class FleetVehiclesService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  public loadFleetVehicles(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.fleetVehicles);

      this.http.get<FleetVehiclesModel[]>(apiAddress)
        .subscribe(fleetVehicles => {
          const action: Action = { type: ActionType.GetAllFleetVehicles, payload: fleetVehicles };
          store.dispatch(action);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }
  
  public addCarToFleet(car: FleetVehiclesModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.fleetVehicles);
      this.http.post<FleetVehiclesModel>(apiAddress, car)
        .subscribe(addedCar => {
          const action: Action = { type: ActionType.AddCarToFleet, payload: addedCar };
          store.dispatch(action);
          resolve(true);
        }, err => reject(err));
    });
  }
}
