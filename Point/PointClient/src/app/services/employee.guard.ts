import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Notyf } from 'notyf';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private route: Router) { }

  public canActivate(): boolean {
    if (store.getState().user?.userRole === '2') {
      return true;
    }
    if (store.getState().user?.userRole === '1')
      return false;
    var notyf = new Notyf({ duration: 4000, ripple: false });
    notyf.success('Please login!');

    this.route.navigateByUrl('/login');
    return false;
  }

}
