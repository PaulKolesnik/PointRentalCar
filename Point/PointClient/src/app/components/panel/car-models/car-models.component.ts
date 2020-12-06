import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.scss']
})
export class CarModelsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
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
