import { Router } from '@angular/router';
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

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().user;
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  checkPanelPermissions(): boolean {
    if (!this.user)
      return null;
    return this.user?.userRole == '1' || this.user?.userRole == '2';
  }

  routeOrder(){
    const reservation= JSON.parse(localStorage.getItem("reservation"));
    const id = reservation.id;

    this.route.navigateByUrl('/search-car/order/' + id);


  }
}
