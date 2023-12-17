import { Component, OnInit } from '@angular/core';
import { Appartement } from '../../models/appartement.model';
import { AppartementService } from '../../services/appartement.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrls: ['./appartement.component.scss']
})
export class AppartementComponent implements OnInit {

  appartements: Appartement[];

  appartementForm = this.fb.group({
    nom: ['', Validators.required],
    niveau: ['', Validators.required],
    adresse: ['', Validators.required],
    nombrePieces: [0, Validators.required],
    surface: [null],
    loyerMensuel: [0, Validators.required]
  });
  


  constructor(
    private appartementService: AppartementService,
    private fb: FormBuilder,
    public authService : AuthService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des appartements.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadAppartementList(headers);
  }

  loadAppartementList(headers: any) {
    this.appartementService.getAllAppartements(headers).subscribe(
      (data: Appartement[]) => {
        this.appartements = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des appartements.'
        });
        console.error('Erreur lors de la récupération des appartements :', error);
      }
    );
  }

  onSubmit() {
    if (this.appartementForm.valid) {
      const appartement: Appartement = {
        id: null,
        nom: this.appartementForm.value.nom,
        niveau: this.appartementForm.value.niveau,
        adresse: this.appartementForm.value.adresse,
        nombrePieces: this.appartementForm.value.nombrePieces,
        surface: this.appartementForm.value.surface,
        loyerMensuel: this.appartementForm.value.loyerMensuel
      };

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

      this.appartementService.addAppartement(appartement, headers).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'L\'appartement a été ajouté avec succès.'
          });
          this.appartementForm.reset();
          this.loadAppartementList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'appartement:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de l\'appartement.'
          });
        }
      );
    }
  }

  // Variable pour suivre si le modal est ouvert
isUpdateModalVisible: boolean = false;
// Variable pour stocker l'appartement actuel pour la mise à jour
currentAppartementForUpdate: Appartement;

// ...

openUpdateModal(appartement: Appartement) {
  this.currentAppartementForUpdate = appartement;

  // Initialisez le formulaire de mise à jour avec les valeurs actuelles
  this.updateAppartementForm.patchValue({
    adresse: appartement.adresse,
    nombrePieces: appartement.nombrePieces,
    surface: appartement.surface,
    loyerMensuel: appartement.loyerMensuel
  });

  this.isUpdateModalVisible = true;
}



// Créez un formulaire distinct pour la mise à jour
updateAppartementForm = this.fb.group({
  adresse: ['', Validators.required],
  nombrePieces: [0, Validators.required],
  surface: [null],
  loyerMensuel: [0, Validators.required]
});




  updateAppartement(id: number) {
    const appartementToUpdate = this.appartements.find(appartement => appartement.id === id);
  
    if (appartementToUpdate) {
      this.appartementForm.patchValue({
        adresse: appartementToUpdate.adresse,
        nombrePieces: appartementToUpdate.nombrePieces,
        surface: appartementToUpdate.surface,
        loyerMensuel: appartementToUpdate.loyerMensuel
      });
  
      const token = localStorage.getItem('token');
      
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour effectuer cette action.'
        });
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      console.log('Données à envoyer :', appartementToUpdate);
      this.appartementService.updateAppartement(appartementToUpdate, headers).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'L\'appartement a été mis à jour avec succès.'
          });
          this.loadAppartementList(headers);
          this.updateAppartementForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'appartement:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de la mise à jour de l\'appartement.'
          });
        }
      );
    }
  }
  

  
  
    // Suppression d'un appartement
    deleteAppartement(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer cet appartement ?',
        text: 'L\'appartement sera définitivement supprimé!',
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
  
          this.appartementService.deleteAppartement(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'L\'appartement a été supprimé avec succès.',
                icon: 'success'
              });
              this.loadAppartementList(headers);
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer cet appartement.',
                icon: 'error'
              });
            }
          );
        }
      });
    }
  
}
