// auth-guard.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(public authService: AuthService, public router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifiez si l'utilisateur est connecté
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login')
      return false;
    }
    
    // Vérifiez si les rôles sont disponibles dans la propriété `roles` du service AuthService
    if (this.authService.roles) {
      return true;
    }
    
    // Si les rôles ne sont pas disponibles, récupérez-les en appelant la méthode `fetchRoles`
    return this.authService.fetchRoles().pipe(
      map((roles) => {
        if (roles) {
          return true;
        } else {
          // Redirigez vers une page non autorisée si les rôles ne sont pas disponibles
          this.router.navigate(['/unauthorized']);
          return false;
        }
      })
    );
  }
}
