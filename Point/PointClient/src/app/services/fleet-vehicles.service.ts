import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FleetVehiclesModel } from '../components/search-car/models/cars.model';
import { ActionType } from '../redux/action-type';
import { Action } from '../redux/action';
import { store } from '../redux/store';
import { ConfigurationService } from './configuration/configuration.service';
import { NumberFormatStyle } from '@angular/common';
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
          fleetVehicles.forEach(car =>{
            car.carImgName = apiAddress + '/images/' + car.carImg
          })
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
          carFromFleet.carImgName = apiAddress + '/images/' + carFromFleet.carImg;

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

      const formData = new FormData();

      formData.append("Vin",car.vin);
      formData.append("ModelID",car.modelID.toString());
      formData.append("Color",car.color);
      formData.append("PurchaseDate",car.purchaseDate.toString());
      formData.append("CarYear",car.carYear);
      formData.append("Mileage",car.mileage);
      formData.append("image",car.carImg ,car.carImg.name);
      formData.append("CarImg",car.carImgName);
      formData.append("Gearbox",car.gearbox );
      formData.append("ToUsed",car.toUsed);
      formData.append("CarFixed",car.carFixed);
      formData.append("BranchID",car.branchID.toString());
      this.http.post<FleetVehiclesModel>(apiAddress, formData)
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


        this.http.put<FleetVehiclesModel>(apiAddress + '/' + id, car)
          .subscribe(car => {
            const action: Action = { type: ActionType.UpdateCarFromFleet, payload: car };
            store.dispatch(action);
            resolve(true);
          }, err => reject(err));
      });
    }

    public DeleteCarFromFleet(id: NumberFormatStyle): Promise<boolean> {
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
