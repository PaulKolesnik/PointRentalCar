import { CredentialsModel } from './../models/credentials-model';
import { store } from './../redux/store';
import { ConfigurationService } from './configuration/configuration.service';
import { UserModel } from './../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';
import { PhoneModel } from '../models/phone-model';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Action } from 'redux';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService,

  ) { }

  public async register(user: UserModel): Promise<boolean> {
    try {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.users);

      // const formData = new FormData();

      // const phone: PhoneModel = {
      //   loc: user.phone.loc,
      //   phoneID: 0,
      //   locID: 0,
      //   PhoneNumber: user.phone.PhoneNumber,
      // };

      // formData.append("userRole", user.userRole);
      // formData.append("fullName", user.fullName);
      // formData.append("userName", user.userName);
      // formData.append("password", user.password);
      // formData.append("gender", user.gender);
      // if (user.image)
      //   formData.append("image", user.image, user.image.name);
      // if (user.birthDate)
      //   formData.append("birthDate", user.birthDate.toString());
      // formData.append("email", user.email);
      // formData.append("jwtToken", user.jwtToken);

      // console.log("phone", JSON.stringify(phone));
      // formData.append("phone",  JSON.stringify(phone));



      const registeredUser = await this.http.post<UserModel>(apiAddress + "/register", user).toPromise();
      store.dispatch({ type: ActionType.Register, payload: registeredUser });
      return true;

    }
    catch (err) {
      console.log(err);
      return false;
    }
  }
  public async login(credentials: CredentialsModel): Promise<boolean> {
    try {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.users);
      const loggedUser = await this.http.post<UserModel>(apiAddress + "/login", credentials).toPromise();
      store.dispatch({ type: ActionType.Login, payload: loggedUser });
      return true;
    }
    catch (err) {
      return false;
    }
  }
  public logout(): void {
    store.dispatch({ type: ActionType.Logout });
  }

  public LoadUsers(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.users);

      this.http.get<UserModel[]>(apiAddress)
        .subscribe(users => {
          users.forEach(user => {
            user.userPic = apiAddress + '/images/' + user.userPic;
          })
          store.dispatch({ type: ActionType.GetAllUsers, payload: users });
          resolve(true);
        }, err => {
          console.log(err);
          reject(false);
        });
    });


  }

  public DeleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.users);

      this.http.delete<UserModel>(apiAddress + '/' + id)
        .subscribe((deletedUser) => {
          store.dispatch( { type: ActionType.DeleteCarFromFleet, payload: deletedUser});
          resolve(true);
        }, err => reject(err));
    });
  }

}
