import { FleetVehiclesService } from './../../services/fleet-vehicles.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { store } from 'src/app/redux/store';
import { FleetVehiclesModel } from './models/cars.model';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit ,OnDestroy {
  public fleetVehicles: FleetVehiclesModel[];
  private unsubscribe: Unsubscribe;

  constructor(
    private modalService: NgbModal,
    private fleetVehiclesServices: FleetVehiclesService
  ) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.fleetVehicles = store.getState().fleetVehicles;
    });

    if (store.getState().fleetVehicles.length > 0) {
      this.fleetVehicles = store.getState().fleetVehicles;
    }
    else {
      await this.fleetVehiclesServices.loadFleetVehicles();
    }

    console.log('fleetVehicles',this.fleetVehicles);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }


  open(content) {
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log(result);
      }, reason => {
        console.log(reason);
      });
  }



}
