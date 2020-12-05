import { HttpClient, HttpParams } from '@angular/common/http';
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

  public getOneCarFromFleet(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.fleetVehicles);

      this.http.get<FleetVehiclesModel>(apiAddress + '/' + id )
        .subscribe(carFromFleet => {
          const action: Action = { type: ActionType.GetOneCarFromFleet, payload: carFromFleet };
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
    public UpdateCarFromFleet(id: number, car: FleetVehiclesModel): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.fleetVehicles);

        const params = new HttpParams()
              .set('id', id.toString())
              .set('carFromFleet', JSON.stringify(car))

        this.http.put<FleetVehiclesModel>(apiAddress, {params})
          .subscribe(car => {
            const action: Action = { type: ActionType.UpdateCarFromFleet, payload: car };
            store.dispatch(action);
            resolve(true);
          }, err => reject(err));
      });
    }

    public DeleteCarFromFleet(id: number, car: FleetVehiclesModel): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.fleetVehicles);

        this.http.delete<FleetVehiclesModel>(apiAddress + '/' + id)
          .subscribe(deletedCar => {
            const action: Action = { type: ActionType.DeleteCarFromFleet, payload: deletedCar };
            store.dispatch(action);
            resolve(true);
          }, err => reject(err));
      });
    }



}
