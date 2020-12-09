import { CarCategoryModel } from './../components/search-car/models/cars.model';
import { ConfigurationService } from './configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  public async getAllCategories(): Promise<CarCategoryModel[]> {
    try {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.carCategory);
      const categories: CarCategoryModel[] = await this.http.get<CarCategoryModel[]>(apiAddress).toPromise();

      return categories;

    } catch (err) {
      console.log(err.message);
    }
  }
}
