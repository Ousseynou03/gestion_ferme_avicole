import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate{

  
  constructor(public authService: AuthService, public router: Router) {}

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.authService.roles.includes("admin")){
        return true;
      }
      else {
        this.router.navigateByUrl('/notAuthorized')
        return false;
      }
    
  }

  
}