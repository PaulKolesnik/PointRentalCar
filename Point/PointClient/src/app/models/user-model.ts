import { PhoneModel } from './phone-model';
export class UserModel {
  public constructor(
    public userID?: number,
    public userRole?: string,
    public fullName?: string,
    public userName?: string,
    public password?: string,
    public gender?: string,
    public birthDate?: Date,
    public email?: string,
    public phoneID?: number,
    public userPic?: string,
    public jwtToken?: string,
    public phone?: PhoneModel
    ) {}
}
