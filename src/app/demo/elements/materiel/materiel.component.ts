import { Component, OnInit } from '@angular/core';
import { MaterielService } from '../../services/materiel.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Materiel } from '../../models/materiel.model';
import {Batiment} from "../../models/batiment.model";
import {Fournisseur} from "../../models/fournisseur.model";
import {BatimentService} from "../../services/batiment.service";
import {FournisseurService} from "../../services/fournisseur.service";
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditMaterielComponent } from './dialog/edit-materiel/edit-materiel.component';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit{

  materiels : Materiel[];
  batiments: Batiment[];
  fournisseurs : Fournisseur[];
  headers: any;

  materielForm = this.fb.group({
    designation: ['', Validators.required],
    quantite: [null, Validators.required],
    batiment: [null, Validators.required],
    fournisseur: [null, Validators.required],
  });

  constructor(private materielService: MaterielService,
              public authService: AuthService,
              private batimentService : BatimentService,
              private fournisseurService : FournisseurService,
              private fb : FormBuilder,
              private _matDialog: MatDialog,) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des mateiaux.'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.materielService.getAllMateriels(headers).subscribe(
      (data: Materiel[]) => {
        this.materiels = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des matériaux.'
        });

        console.error('Erreur lors de la récupération des matériaux:', error);
      }
    );

    this.loadBatimentList(headers)
    this.loadFournisseurList(headers)


    }


  addMateriel() {
    if (this.materielForm.valid) {
      const materiel: Materiel = {
        id: null,
        designation: this.materielForm.value.designation,
        quantite: this.materielForm.value.quantite,
        batiment: this.materielForm.value.batiment,
        fournisseur: this.materielForm.value.fournisseur,
      };
  
      console.log('Valeur de Materiel avant envoi:', this.materielForm.value.batiment);
  
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
  
      this.materielService.addMteriel(materiel, headers).subscribe(
        (createdMateriel) => {
          console.log('Materiel created successfully:', createdMateriel);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le Materiel a été ajoutée avec succès.'
          });
          this.loadMaterielList(headers);
          this.materielForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la bande:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout dU Matériel.'
          });
        }
      );
    }
  }



  // Méthode pour récupérer la liste des bâtiments
  loadBatimentList(headers: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.batimentService.getAllBatiments(headers).subscribe(
        (data: Batiment[]) => {
          this.batiments = data;
        },
        (error) => {
        }
      );
    }
  }
  // Méthode pour récupérer la liste des fournisseurs
  loadFournisseurList(headers: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.fournisseurService.getAllFournisseurs(headers).subscribe(
        (data: Fournisseur[]) => {
          this.fournisseurs = data;
        },
        (error) => {
        }
      );
    }
  }


  loadMaterielList(headers: any) {
    this.materielService.getAllMateriels(headers).subscribe(
      (data: Materiel[]) => {
        this.materiels = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des matériels.'
        });
  
        console.error('Erreur lors de la récupération des matériels :', error);
      }
    );
  }


    // Suppression
    deleteMateriel(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer ce matériel ?',
        text: 'Le Matériel sera définitivement supprimé!',
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
    
          this.materielService.deleteMateriel(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'Le Matériel a été supprimé avec succès.',
                icon: 'success'
              });
              this.materielService.getAllMateriels(headers).subscribe(updatedMatériels => {
                this.materiels = updatedMatériels;
              });
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer ce materiel.',
                icon: 'error'
              });
            }
          );
        }
      });
    }


    openDialogEdit(materiel: any) :void{
      // Open the dialog
      const dialogRef = this._matDialog.open(EditMaterielComponent, {
        backdropClass: 'my-full-screen-dialog',
        panelClass:'my-panelClass-dialog',
        width:'50%',
        data: materiel,
        disableClose: true
    });
  
    dialogRef.afterClosed()
        .subscribe((result) => {
            console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
            if(result == true){
  
              this.loadMaterielList(this.headers)
            }
        });
    }
}
