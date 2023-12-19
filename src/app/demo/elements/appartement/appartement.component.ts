import { Component, OnInit } from '@angular/core';
import { Appartement } from '../../models/appartement.model';
import { AppartementService } from '../../services/appartement.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAppartementComponent } from './dialog/edit-appartement/edit-appartement.component';

@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrls: ['./appartement.component.scss']
})
export class AppartementComponent implements OnInit {

  appartements: Appartement[];
  headers : any;

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
    ,private _matDialog: MatDialog
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



    openDialogEdit(appartement: any) :void{
      // Open the dialog
      const dialogRef = this._matDialog.open(EditAppartementComponent, {
        backdropClass: 'my-full-screen-dialog',
        panelClass:'my-panelClass-dialog',
        width:'50%',
        data: appartement,
        disableClose: true
    });
  
    dialogRef.afterClosed()
        .subscribe((result) => {
            console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
            if(result == true){
  
              this.loadAppartementList(this.headers)
            }
        });
    }

  
}
