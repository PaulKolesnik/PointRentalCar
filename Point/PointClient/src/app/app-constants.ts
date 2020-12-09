import { API } from './services/configuration/configuration.model';

export class AppConstants {
  static readonly api: API = {
    fleetVehicles: 'api/fleet-vehicles',
    carsModels: 'api/car-models',
    reservation: 'api/reservations',
    users: 'api/users',
    carCategory: 'api/car-category',
    branches: 'api/rental-branch'
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
