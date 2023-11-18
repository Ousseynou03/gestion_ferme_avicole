// Angular import
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/demo/models/user.model';
import { AuthService } from 'src/app/demo/services/auth.service';
//import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {

  userById: User;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Extraire l'ID de l'utilisateur du token
      const userId = this.getUserIdFromToken(token);

      if (userId !== null) {
        // Appeler la méthode pour récupérer l'utilisateur par ID
        this.getUserById(userId);
      }
    }
  }

  // Récupérer l'ID de l'utilisateur à partir du token
  getUserIdFromToken(token: string): number | null {
    try {
      // Décoder le token
     // const decodedToken: any = jwt_decode(token);
     const decodedToken: any = (token);

      // Extraire l'ID de l'utilisateur du token (ajustez cela selon la structure de votre token)
      const userId = decodedToken.userId;

      // Retourner l'ID de l'utilisateur
      return userId;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  // Récupération des informations de l'utilisateur par ID
  getUserById(id: number) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.authservice.getUserById(id, headers).subscribe(
        (data: any) => {
          this.userById = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur par ID:', error);
        }
      );
    }
  }
}