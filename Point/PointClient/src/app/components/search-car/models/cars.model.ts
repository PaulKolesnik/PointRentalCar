export class FleetVehiclesModel {
  id: number;
  vin: string;
  modelID: number;
  color: string;
  purchaseDate: Date;
  carYear: string;
  mileage: string;
  carImg: string;
  gearbox: string;
  toUsed: string;
  carFixed: string;
  branchID: number;
  branch: BranchModel;
  carModel: CarsModel;
  constructor() {
  }
}

export class CarsModel {
  cModelID: number;
  cModelManufacturer: string;
  cModelName: string;
  cModelCatID: number;

  priceDay: number;
  priceLateDay: number;
  cModelCat: CarCategoryModel;

  fullName: string;
  constructor() {

  }
}

export class CarCategoryModel {
  catID: number;
  catName: string;
  carDesc?: string;

  constructor() {

  }
}
export interface BranchModel {
  branchID: number,
  address: string,
  name: string,
  locID: number,
  location: LocationModel
}
export interface LocationModel {
  locID: number,
  latitude: number,
  longitude: number
}
