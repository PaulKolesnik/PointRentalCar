import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Unsubscribe } from 'redux';
import { store } from 'src/app/redux/store';
import { FleetVehiclesService } from 'src/app/services/fleet-vehicles.service';
import { FleetVehiclesModel } from '../../search-car/models/cars.model';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-fleet-vehicle',
  templateUrl: './fleet-vehicle.component.html',
  styleUrls: ['./fleet-vehicle.component.scss']
})
export class FleetVehicleComponent implements OnInit {

  fleetVehicles: FleetVehiclesModel[];
  carFromFleet: FleetVehiclesModel;
  private unsubscribe: Unsubscribe;


  constructor(
    private modalService: NgbModal,
    private fleetVehiclesService: FleetVehiclesService
  ) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.fleetVehicles = store.getState().fleetVehicles;
    });

    if (store.getState().fleetVehicles.length > 0) {
      this.fleetVehicles = store.getState().fleetVehicles;
    }
    else {
      await this.fleetVehiclesService.loadFleetVehicles();
    }

    console.log('fleetVehicles', this.fleetVehicles);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }



  open(content, id: number) {
    this.findCarFromFleet(id);
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log(result);
      }, reason => {
        console.log(reason);
      });
  }
  public findCarFromFleet(id: number): void {
    this.carFromFleet = this.fleetVehicles.find(c => c.id === id);
  }

  public async deleteCarFromFleet(id: number) {
    try {
      const answer = confirm("Are you sure you want to delete?");
      if (!answer)
        return;


      await this.fleetVehiclesService.DeleteCarFromFleet(id);
      // setTimeout(() => {

      // }, 600);
      var notyf = new Notyf();
      notyf.success('Car has been deleted!');
    }
    catch (err) {
      console.log(err.message);
    }
  }
}
