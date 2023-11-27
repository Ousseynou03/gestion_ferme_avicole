import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  users: User[] = [];

  user: User = {
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    id: 0
  };

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Récupérez le token JWT du localStorage (ou d'où vous le stockez)
    const token = localStorage.getItem('token');

    if (!token) {
      // Gérez l'absence de token, par exemple, en redirigeant l'utilisateur vers la page de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des Users.'
      });
      return;
    }

    // Créez un en-tête pour inclure le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP pour récupérer la liste des bâtiments avec le token dans l'en-tête
    this.authService.getAllUsers(headers).subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Action Non Autorisée',
          text: "Vous n'êtes pas autorisé à visualiser la liste des utilisateurs ."
        });

        console.error('Erreur lors de la récupération des users:', error);
      }
    );
  }

  signUp() {
    // Récupérez le token JWT du localStorage (ou d'où vous le stockez)
    const token = localStorage.getItem('token');

    if (!token) {
      // Gérez l'absence de token, par exemple, en redirigeant l'utilisateur vers la page de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté en tant que administrateur pour effectuer cette action.'
      });
      return;
    }

    // Créez un en-tête pour inclure le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.authService.signUp(this.user, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'L\'utilisateur a été enregistré avec succès.'
        });

        console.log('Utilisateur enregistré:', response);
                // Une fois l'inscription réussie, rechargez la liste des utilisateurs
                this.loadUserList();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n/'êtes pas autorisé à enregistrer un utilisateur ."
        });

        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      }
    );
  }


  loadUserList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.authService.getAllUsers(headers).subscribe(
        (data: User[]) => {
          this.users = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Non Autorisé',
            text: "Vous n'êtes pas autorisé à visualiser la liste utilisateurs"
          });

          console.error('Erreur lors de la récupération des utilisateurs:', error);
        }
      );
    }
  }

  // Suppression
  deleteUser(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      text: 'L\'utilisateur définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        const token = localStorage.getItem('token');

        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous devez être connecté en tant qu\'administrateur pour effectuer cette action.'
          });
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        this.authService.deleteUser(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L\'utilisateur a été supprimé avec succès.',
              icon: 'success'
            });
            this.authService.getAllUsers(headers).subscribe(updatedUsers => {
              this.users = updatedUsers;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cet utilisateur.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
}
