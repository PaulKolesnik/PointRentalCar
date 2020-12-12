import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { store } from '../redux/store';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private route: Router) {  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (store.getState().user) {
      return true;
    }
    var notyf = new Notyf({ duration: 4000, ripple: false});
    notyf.success('Please login!');

    this.route.navigateByUrl('/login');
    return false;
  }

}
