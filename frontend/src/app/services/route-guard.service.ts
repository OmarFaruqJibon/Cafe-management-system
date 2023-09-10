import { Injectable } from '@angular/core';
import { globalConstant } from '../shared/global-constant';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  constructor(
    public auth: AuthService,
    private router: Router,
    private snackBar: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray: any = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: string = localStorage.getItem('token')!;
    let tokenPayload: any;

    try {
      tokenPayload = jwt_decode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for (let role of expectedRoleArray) {
      if (role === tokenPayload.role) {
        checkRole = true;
      }
    }

    if (tokenPayload.role === 'user' || tokenPayload.role === 'admin') {
      if (this.auth.isAuthenticated() && checkRole) {
        return true;
      }

      this.snackBar.openSnackBar(
        globalConstant.unauthorize,
        globalConstant.error
      );

      this.router.navigate(['/']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}
