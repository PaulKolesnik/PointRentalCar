import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
         console.log(result);
      }, reason =>{
        console.log(reason);
      });
  }


  ngOnInit(): void {
  }

}
