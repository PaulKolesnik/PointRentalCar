import { CredentialsModel } from './../models/credentials-model';
import { store } from './../redux/store';
import { ConfigurationService } from './configuration/configuration.service';
import { UserModel } from './../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';

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
      const registeredUser = await this.http.post<UserModel>(apiAddress + "/register", user).toPromise();
      store.dispatch({ type: ActionType.Register, payload: registeredUser });
      return true;

    }
    catch (err) {
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
}
