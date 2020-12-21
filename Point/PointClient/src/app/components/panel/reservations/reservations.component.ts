import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notyf } from 'notyf';
import { ReservationModel } from 'src/app/models/reservation-model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: ReservationModel[];
  reservation: ReservationModel;
  constructor(
    private reservationService: ReservationService,
    private modalService: NgbModal,
  ) { }

  async ngOnInit() {
    this.reservations = await this.reservationService.getAllReservations();
    console.log('reservation', this.reservations)
  }
  open(content, id: number) {
    this.findRed(id);
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log(result);
      }, reason => {
        console.log(reason);
      });
  }
  public findRed(id: number): void {
    this.reservation = this.reservations.find(r => r.reservationID === id);
  }

  public async deleteRes(id: number) {
    try {
      const answer = confirm("Are you sure you want to delete?");
      if (!answer)
        return;


      await this.reservationService.DeleteReservation(id);
      var notyf = new Notyf();
      notyf.success('reservation has been deleted!');
    }
    catch (err) {
      console.log(err.message);
    }
  }
}
