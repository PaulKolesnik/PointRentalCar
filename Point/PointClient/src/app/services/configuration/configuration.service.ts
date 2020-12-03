import { Injectable } from '@angular/core';
import { AppConstants } from '../../app-constants';
import { API, SystemSettings } from './configuration.model'
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public api: API;
  public systemSettings: SystemSettings;

  constructor() {
    this.api = AppConstants.api;
    this.systemSettings = AppConstants.systemSettings;
  }

  getApiEndPoint(apiName: string): string{
    return this.systemSettings.baseDomain + '/' + apiName;
  }


}
