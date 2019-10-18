import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const path = route.url[0].path;
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      if (path === "login" || path === "register") {
        return true;
      } else {
        this.router.navigateByUrl('/login');
      }
      return false;
    } else {
      if (path === 'login' || path === 'register') {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }
  }
}
