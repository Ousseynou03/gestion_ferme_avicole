import { Component } from '@angular/core';
import { AuthService } from 'src/app/demo/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-password',
  templateUrl: './add-new-password.component.html',
  styleUrls: ['./add-new-password.component.scss']
})
export class AddNewPasswordComponent {

  showForm = true;
  authenticatedUser: any;
  oldPassword: string = '';
  newPassword: string = '';
  headers : any

  constructor(public authService : AuthService){}



  changePassword(oldPassword: string, newPassword: string) {
    this.authService.changePassword({ oldPassword, newPassword }).subscribe(
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


    // Méthode appelée lors de la soumission du formulaire dans la modal
    submitChangePasswordForm() {
      this.changePassword(this.oldPassword, this.newPassword);
    }



    closeForm(): void {
      // Mettez à jour la variable showForm pour masquer le formulaire
      this.showForm = false;
    }

}
