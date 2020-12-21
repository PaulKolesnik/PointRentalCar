import { FleetVehiclesModel } from "../components/search-car/models/cars.model";
import { UserModel } from "./user-model";

export class ReservationModel {
  constructor(
    public reservationID?: number,
    public amount?: number,
    public pDate?: Date,
    public rDate?: Date,
    public fDate?: Date,
    public carsID?: number,
    public usersID?: number,
    public paidUP?: string,
    public car?: FleetVehiclesModel,
    public user?: UserModel,

    public totalAmount: number = 0,
  ) { }

}
