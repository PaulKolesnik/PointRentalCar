import { Component, OnInit } from '@angular/core';
import { ReservationModel } from 'src/app/models/reservation-model';
import { ReservationService } from 'src/app/services/reservation.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.scss']
})
export class ReturnCarComponent implements OnInit {

  reservations: ReservationModel[];
  searchText: string;
  //totalAmount: number = 0;
  date: Date;
  constructor(private reservationService: ReservationService,
  ) { }

  async ngOnInit() {
    this.reservations = await this.reservationService.getAllReservations();
    console.log('reservations', this.reservations)
    this.reservations.forEach(r => {
      r.totalAmount = this.calcAmount(r);
    })
  }


  public calcAmount(r: ReservationModel): number {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const now = new Date();

    const todayDateUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const mustReturned = new Date(r.rDate)
    const mustReturnedUTC = Date.UTC(mustReturned.getFullYear(), mustReturned.getMonth(), mustReturned.getDate());

    if (todayDateUTC > mustReturnedUTC) {
      const diffDays = Math.floor((todayDateUTC - mustReturnedUTC) / oneDay);
      return (diffDays * r.car.model.priceLateDay) + r.amount;
    }
    return r.amount;
  }

  public returnCarToFleet(id: number) {
    var notyf = new Notyf();
    if (this.reservations[id].car?.toUsed === 'no') {
      notyf.error('reservation has been returned!');
      return;
    }
    const answer = confirm("Are you sure you want return this car?");
    if (!answer)
      return;

    this.reservationService.returnCarToFleet(id, this.reservations[id]);
    notyf.success('reservation has been returned!');

  }
}
