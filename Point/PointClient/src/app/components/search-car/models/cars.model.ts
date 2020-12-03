export interface CarsModel{
  cModelID: number;
  cModelManufacturer: string;
  cModelName: string;
  cModelCatID: number;

  priceDay: number;
  priceLateDay: number;
  cModelCat: CarCategoryModel;
  fleetVehicles;
}
export interface CarCategoryModel{
  catID: number;
  catName: string;
  carDesc?: string;
}
