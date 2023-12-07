import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {


  authenticatedUser: any;
  oldPassword: string = '';
  newPassword: string = '';


  constructor(public authService: AuthService) {}

  changePassword() {
    this.authService.changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword }).subscribe(
      (response) => {
        console.log('Changement de mot de passe réussi.', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le mot de passe a été modifié avec succès.'
        });
      },
      (error) => {
        console.error('Erreur lors du changement de mot de passe.', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors du changement de mot de passe.'
        });
      }
    );
  }
  
  submitChangePasswordForm() {
    this.changePassword();
  }

}
