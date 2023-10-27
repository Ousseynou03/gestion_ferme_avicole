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

  constructor(private authService: AuthService) {}

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
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des users.'
        });

        console.error('Erreur lors de la récupération des users:', error);
      }
    );
  }


}
