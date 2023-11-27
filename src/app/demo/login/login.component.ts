import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {



  credentials: { email: string, password: string } = { email: '', password: '' };

  constructor(private authService: AuthService, 
    private router: Router) {}


    login() {
      this.authService.login(this.credentials).subscribe(
        (response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            Swal.fire({
              icon: 'success',
              title: 'Bienvenue.',
              showConfirmButton: false,
              timer: 1500
            }).then();
            this.authService.loadProfile(response)
            this.router.navigate(['/default']).then(r => r);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur d\'authentification',
              text: 'Vérifiez vos identifiants et réessayez.'
            });
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion', error);
  
          // Afficher une alerte d'erreur avec SweetAlert en cas d'erreur HTTP
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de la connexion',
            text: 'Une erreur s\'est produite lors de la connexion.'
          });
        }
      );
    }
  

    /*
    login(){
      let username = this.credentials.email
      let pwd = this.credentials.password

      this.authService.login(username,pwd).subscribe({
        next : data => {
          
          this.authService.loadProfile(data)
          this.router.navigate(['/default'])
        },
        error : err => {
          console.log(err);
          
        }
      })
    }
    */
    

}
