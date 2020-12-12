import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user-model';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  user: UserModel = store.getState().user;
  private unsubscribe: Unsubscribe;

  constructor() { }

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().user;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }


}
