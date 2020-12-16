import { LocationModel } from './../components/search-car/models/cars.model';
export class PhoneModel {
  loc?: LocationModel;
  public constructor(
    loc?: LocationModel,
    public phoneID?: number,
    public locID?: number,
    public PhoneNumber?: string,
  ) {
    this.loc = loc;
  }
}
