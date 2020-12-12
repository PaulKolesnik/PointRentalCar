import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '../redux/action';
import { store } from '../redux/store';
import { CarsModel } from './../components/search-car/models/cars.model';
import { ActionType } from './../redux/action-type';
import { ConfigurationService } from './configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class CarModelsService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  public loadCarsModels(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carsModels);
      const options = { headers: { Authorization: 'Bearer ' + store.getState().user?.jwtToken } }
      this.http.get<CarsModel[]>(apiAddress, options)
        .subscribe(carsModels => {
          carsModels.forEach(carModel => {
            carModel.fullName = carModel.cModelManufacturer + ' ' + carModel.cModelName;
          });
          const action: Action = { type: ActionType.GetAllCarsModels, payload: carsModels };
          store.dispatch(action);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }


  public getOneCarModel(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carsModels);

      this.http.get<CarsModel>(apiAddress + '/' + id)
        .subscribe(carFromFleet => {
          const action: Action = { type: ActionType.GetOneCarModel, payload: carFromFleet };
          store.dispatch(action);
          resolve(true);
        }, err => {
          reject(err);
        });
    });
  }

  public addCarModel(carModel: CarsModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carsModels);

      this.http.post<CarsModel>(apiAddress, carModel)
        .subscribe(addedCarModel => {
          const action: Action = { type: ActionType.AddCarModel, payload: addedCarModel };
          store.dispatch(action);
          resolve(true);
        }, err => reject(err));
    });
  }
  public UpdateCarModel(id: number, carModel: CarsModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carsModels);

      this.http.put<CarsModel>(apiAddress + '/' + id, carModel)
        .subscribe(carModel => {
          const action: Action = { type: ActionType.UpdateCarModel, payload: carModel };
          store.dispatch(action);
          resolve(true);
        }, err => reject(err));
    });
  }

  public DeleteCarModel(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carsModels);

      this.http.delete<CarsModel>(apiAddress + '/' + id)
        .subscribe(deletedCarModel => {
          const action: Action = { type: ActionType.DeleteCarModel, payload: deletedCarModel };
          store.dispatch(action);
          resolve(true);
        }, err => reject(err));
    });
  }

}
