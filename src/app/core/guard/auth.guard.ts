import { Injectable } from "@angular/core";
import { map, take } from 'rxjs/operators';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (this.authService.isLoggedIn) {
    //   return true;
    // }
    // this.router.navigate(["/authentication/signin"]);
    // return false;
    return this.authService.isLoggedIn
    .pipe(
        take(1),
        map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
                this.router.navigate(['/authentication/signin']);
                return false;
            }
            return true;
        })
    );
  }
}
