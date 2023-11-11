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

  fournisseur : Fournisseur = {
    id : null,
    type : '',
    nom: '',
    numTel: '',
    email: ''
  }

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


  //Ajout
  addFournisseur(){
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté...'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.fournisseurService.addFournisseur(this.fournisseur, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Fournisseur ajouté avec succcés'
        });

        console.log('Fournisseur enregistré:', response);
        this.loadFournisseurList();
                
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n/'êtes pas autorisé à enregistrer un fournisseur ."
        });

        console.error('Erreur lors de l\'enregistrement d\' un fournisseur:', error);
      }
    );
  }
  loadFournisseurList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.fournisseurService.getAllFournisseurs(headers).subscribe(
        (data: Fournisseur[]) => {
          this.fournisseurs = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des fournisseurs:', error);
        }
      );
    }
  }


  //Suppession
  deleteFounisseur(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce founisseur ?',
      text: 'Le founisseur sera définitivement supprimé!',
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
  
        this.fournisseurService.deleteFournisseur(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le fournisseur a été supprimé avec succès.',
              icon: 'success'
            });
            this.fournisseurService.getAllFournisseurs(headers).subscribe(updatedFounisseur => {
              this.fournisseurs = updatedFounisseur;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce founisseur.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

}
