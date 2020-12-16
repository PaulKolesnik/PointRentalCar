import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user-model';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  private unsubscribe: Unsubscribe;
  user: UserModel = store.getState().user;

  constructor() { }

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().user;
    });
    //Toggle Click Function
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

}
