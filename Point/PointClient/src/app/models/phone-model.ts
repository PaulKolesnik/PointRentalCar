import { LocationModel } from './../components/search-car/models/cars.model';
export class PhoneModel {
  public constructor(
    public phoneID?: number,
    public locID?: number,
    public PhoneNumber?: string,
    public location?: LocationModel
  ) { }
}
