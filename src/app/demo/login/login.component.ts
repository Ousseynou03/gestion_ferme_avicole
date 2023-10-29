import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: { email: string, password: string } = { email: '', password: '' };

  constructor(private authService: AuthService, 
    private router: Router) {}


    onLogin() {
      this.authService.login(this.credentials).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Bienvenue.',
              showConfirmButton: false,
              timer: 1500
            }).then();
            this.router.navigate(['/default']).then(r => r);
          },
          (error) => {
            let message: string;
            if (error.code === 'auth/user-not-found') {
              message = 'Adresse Email invalide!';
            } else if (error.code === 'auth/wrong-password') {
              message = 'Mot de passe incorrecte!';
            } else if (error.code === 'userNotActived') {
              message = 'Votre compte a été désactivé. Veuillez contacter l\'administrateur!';
            } else {
              message = 'Une erreur est survenue. Veuillez réessayer svp!';
            }
            Swal.fire(
                'Oups!',
                message,
                'error'
            ).then();
          });
    }
    

}
