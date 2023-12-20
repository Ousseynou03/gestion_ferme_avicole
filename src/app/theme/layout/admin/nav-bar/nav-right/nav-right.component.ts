// Angular import
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { AddNewPasswordComponent } from 'src/app/demo/elements/change-password/dialog/add-new-password/add-new-password.component';
import { User } from 'src/app/demo/models/user.model';
import { AuthService } from 'src/app/demo/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{


 // user: User = new User();
  authenticatedUser: any;
  oldPassword: string = '';
  newPassword: string = '';


  constructor(public authService: AuthService, private actRoute: ActivatedRoute, private _matDialog: MatDialog) {}
  


  logout() {
    this.authService.doLogout()
  }


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

    
  ngOnInit(): void {
  }

  openDialogEdit(changePassword: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(AddNewPasswordComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: changePassword,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
      });
  }


}

