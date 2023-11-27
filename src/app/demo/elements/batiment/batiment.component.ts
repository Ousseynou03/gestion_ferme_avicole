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

  batiment: Batiment = {
    id : null,
    code : '',
    designation : '',
    capacite : '',
    dimension : ''
  };

  constructor(private batimentService: BatimentService, public authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des bâtiments.'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
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

//Ajout
    addBatiment(){
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
      this.batimentService.addBatiment(this.batiment, headers).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Batiment ajouté avec succcés'
          });
  
          console.log('Batiment enregistré:', response);
          this.loadBatimentList();
                  
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Enregistrement non autorisé',
            text: "Vous n/'êtes pas autorisé à enregistrer un batiment ."
          });
  
          console.error('Erreur lors de l\'enregistrement d\' un batiment:', error);
        }
      );
    }
    loadBatimentList() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.batimentService.getAllBatiments(headers).subscribe(
          (data: Batiment[]) => {
            this.batiments = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des batiments:', error);
          }
        );
      }
    }

    selectedBatiment: Batiment = {
      id : null,
      code : '',
      designation : '',
      capacite : '',
      dimension : ''
    };



  // Nouvelle méthode pour mettre à jour un bâtiment
  updateBatiment() {
    const token = localStorage.getItem('token');
    if (!token) {
      // Gérer le cas où l'utilisateur n'est pas connecté
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.batimentService.updateBatiment(this.selectedBatiment, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour',
          text: 'Batiment mis à jour avec succès'
        });

        console.log('Batiment mis à jour:', response);
        this.loadBatimentList();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Mise à jour non autorisée',
          text: 'Vous n\'êtes pas autorisé à mettre à jour un bâtiment.'
        });

        console.error('Erreur lors de la mise à jour d\'un bâtiment:', error);
      }
    );
  }

  // Nouvelle méthode pour pré-remplir le formulaire de mise à jour
  editBatiment(batiment: Batiment) {
    // Copiez les données du bâtiment à mettre à jour dans selectedBatiment
    this.selectedBatiment = { ...batiment };
  } 


// Suppression
  deleteBatiment(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce batiment ?',
      text: 'Le batiment sera définitivement supprimé!',
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
  
        this.batimentService.deleteBatiment(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le batiment a été supprimé avec succès.',
              icon: 'success'
            });
            this.batimentService.getAllBatiments(headers).subscribe(updatedBatiments => {
              this.batiments = updatedBatiments;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce batiment.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  
  











  }

