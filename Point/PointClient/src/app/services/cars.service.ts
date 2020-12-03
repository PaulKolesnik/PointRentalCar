import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration/configuration.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CarsModel } from '../components/search-car/models/cars.model';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  public async getAllCars(): Promise<CarsModel[]> {
    try {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.cars);

      const cars: CarsModel[] = await this.http.get<CarsModel[]>(apiAddress).toPromise();

      return cars;
    } catch (error) {
      console.log(error);
    }

  }
}
