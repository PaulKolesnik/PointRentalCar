import { ConfigurationService } from './configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationModel } from '../models/reservation-model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }


  public getAllReservations(): Promise<ReservationModel[]> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);
    return this.http.get<ReservationModel[]>(apiAddress).toPromise();
  }


  public getOneReservation(id: number): Promise<ReservationModel> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);
    return this.http.get<ReservationModel>(apiAddress + '/' + id).toPromise();
  }

  public addReservation(reservation: ReservationModel): Promise<ReservationModel> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);

    return this.http.post<ReservationModel>(apiAddress, reservation).toPromise();

  }
  public UpdateReservation(id: number, reservation: ReservationModel): Promise<ReservationModel> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);

    return this.http.put<ReservationModel>(apiAddress + '/' + id, reservation).toPromise();
  }
  public returnCarToFleet(id: number, reservation: ReservationModel): Promise<ReservationModel> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);

    return this.http.put<ReservationModel>(apiAddress + '/return/' + id, reservation).toPromise();
  }

  public DeleteReservation(id: number): Promise<ReservationModel> {
    const apiAddress = this.configurationService.getApiEndPoint(this.configurationService.api.reservation);

    return this.http.delete<ReservationModel>(apiAddress + '/' + id).toPromise();
  }

}
