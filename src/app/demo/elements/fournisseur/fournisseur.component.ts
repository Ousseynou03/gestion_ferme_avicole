import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit{

  fournisseurs: Fournisseur[] = [];

  constructor(private fournisseurService: FournisseurService, private authService: AuthService) {}


  ngOnInit() {
    // Récupérez le token JWT du localStorage (ou d'où vous le stockez)
    const token = localStorage.getItem('token');

    if (!token) {
      // Gérez l'absence de token, par exemple, en redirigeant l'utilisateur vers la page de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des Fournisseurs.'
      });
      return;
    }

    // Créez un en-tête pour inclure le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP pour récupérer la liste des bâtiments avec le token dans l'en-tête
    this.fournisseurService.getAllFournisseurs(headers).subscribe(
      (data: Fournisseur[]) => {
        this.fournisseurs = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des fournisseurs.'
        });

        console.error('Erreur lors de la récupération d un fournisseur:', error);
      }
    );
  }

}
