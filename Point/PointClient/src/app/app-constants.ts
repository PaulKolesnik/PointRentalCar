import { API } from './services/configuration/configuration.model';

export class AppConstants {
  static readonly api: API = {
    fleetVehicles: 'api/fleet-vehicles'
  }

  static readonly appRoutes = {
    home: 'home',
    searchCar: 'search-car',
    order: 'order',
    contact: 'contact',
    register: 'register',
    login: 'login',
    panel: 'panel',
    portal: 'portal',
  };

  static readonly systemSettings = {
    baseDomain: 'https://localhost:44316'
  }
}
