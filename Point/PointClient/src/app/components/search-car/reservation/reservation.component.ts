import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationModel } from 'src/app/models/reservation-model';
import { store } from 'src/app/redux/store';
import { FleetVehiclesService } from 'src/app/services/fleet-vehicles.service';
import { FleetVehiclesModel } from '../models/cars.model';
import { ReservationService } from './../../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservation: ReservationModel;

  carFromFleet: FleetVehiclesModel;
  form: FormGroup = new FormGroup({
    vin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])),
    color: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
    purchaseDate: new FormControl('', Validators.required),
    carYear: new FormControl('', Validators.compose([Validators.required, Validators.min(2010), Validators.max(2020)])),
    mileage: new FormControl('', Validators.required),
    gearbox: new FormControl('', Validators.required),
    dateTaken: new FormControl('', Validators.required),
    dateReturn: new FormControl('', Validators.required),
    paidUP: new FormControl('', Validators.required),
  });


  //dates
  public takenDate;
  public returnDate;
  public diffDays;
  public amount;
  public paidUP;
  constructor(
    private fleetVehiclesServices: FleetVehiclesService,
    private myActivatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadCar();
    this.reservation = new ReservationModel();
  }

  public async loadCar() {
    const id = +this.myActivatedRoute.snapshot.params.id;
    await this.fleetVehiclesServices.getOneCarFromFleet(id);
    this.carFromFleet = store.getState().oneCarFromFleet;
    localStorage.setItem("intersect Car", JSON.stringify(this.carFromFleet));
  }

  public calcDaysForRent() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const lastDate = new Date(this.returnDate);
    const firstDate = new Date(this.takenDate);

    const lastDateUTC = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
    const firstDateUTC = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    this.diffDays = Math.floor((lastDateUTC - firstDateUTC) / oneDay);
    this.amount = this.diffDays * this.carFromFleet.carModel.priceDay;
  }
  public completeOrder() {
    this.reservation.usersID = store.getState().user.userID;
    this.reservation.carsID = +this.myActivatedRoute.snapshot.params.id;
    this.reservation.pDate = this.takenDate;
    this.reservation.rDate = this.returnDate;
    this.reservation.fDate = null;
    this.reservation.amount = this.amount;
    this.reservation.paidUP = this.form.controls['paidUP'].value.toString();
    console.log(this.reservation);
    this.reservationService.addReservation(this.reservation);
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    },1000)
  }

}
