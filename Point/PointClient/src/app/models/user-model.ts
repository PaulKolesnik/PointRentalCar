import { PhoneModel } from './phone-model';
export interface UserModel {
    userRole?: string;
    userID?: number;
    fullName?: string;
    userName?: string;
    password?: string;
    gender?: string;
    birthDate?: Date;
    email?: string;
    phoneID?: number;
    userPic?: string;
    image?: File;
    jwtToken?: string;
    phone?: PhoneModel;
}
