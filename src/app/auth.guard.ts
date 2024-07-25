import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const authData = localStorage.getItem('auth');

    if (authData=="token") {
      return of(true); // Token exists, allow access
    } else {
      this.router.navigate(['/auth']); // No token, redirect to login
      return of(false);
    }
  }
}
