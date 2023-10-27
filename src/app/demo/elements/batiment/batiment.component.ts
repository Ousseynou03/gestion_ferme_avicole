import { Component, OnInit } from '@angular/core';
import { BatimentService } from '../../services/batiment.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.scss']
})
export class BatimentComponent implements OnInit{

  batiments: Batiment[] = [];

  constructor(private batimentService: BatimentService, private authService: AuthService) {}

  ngOnInit() {
    // Récupérez le token JWT du localStorage (ou d'où vous le stockez)
    const token = localStorage.getItem('token');

    if (!token) {
      // Gérez l'absence de token, par exemple, en redirigeant l'utilisateur vers la page de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des bâtiments.'
      });
      return;
    }

    // Créez un en-tête pour inclure le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP pour récupérer la liste des bâtiments avec le token dans l'en-tête
    this.batimentService.getAllBatiments(headers).subscribe(
      (data: Batiment[]) => {
        this.batiments = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des bâtiments.'
        });

        console.error('Erreur lors de la récupération des bâtiments:', error);
      }
    );
  }

}
