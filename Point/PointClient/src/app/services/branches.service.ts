import { ConfigurationService } from './configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchModel } from './../components/search-car/models/cars.model';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  public async getAllBranches(): Promise<BranchModel[]> {
    try {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.branches);
      const branches: BranchModel[] = await this.http.get<BranchModel[]>(apiAddress).toPromise();

      return branches;

    } catch (err) {
      console.log(err.message);
    }
  }}
