import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocataireService } from 'src/app/demo/services/locataire.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{

  locataireForm!: FormGroup;
  actionBtn : string = "Envoyer";

  constructor(private formBuilder : FormBuilder, 
    private locataireService : LocataireService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>){}


    ngOnInit(): void {
      this.locataireForm = this.formBuilder.group({
        nom: [],
        prenom: ['', Validators.required],
        adresse: ['', Validators.required],
        email: ['', Validators.required],
        actif: ['', Validators.required],
        appartement: ['', Validators.required],
      });
      if(this.editData){
        this.actionBtn="Modifier";
        this.locataireForm.controls['nom'].setValue(this.editData.matricule);
        this.locataireForm.controls['prenom'].setValue(this.editData.prenom);
        this.locataireForm.controls['adresse'].setValue(this.editData.adresse);
        this.locataireForm.controls['email'].setValue(this.editData.email);
        this.locataireForm.controls['actif'].setValue(this.editData.actif);
        this.locataireForm.controls['appartement'].setValue(this.editData.appartement);
      }
    }


    addLocataire() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      if (!this.editData) {
        if (this.locataireForm.valid) {
          this.locataireService.addLocataire(this.locataireForm.value, headers)
            .subscribe({
              next: (res) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Locataire ajouté avec succès.',
                  showConfirmButton: false,
                  timer: 1500
                }).then();
                this.locataireForm.reset();
                this.dialogRef.close('save');
              },
              error: () => {
                Swal.fire(
                  'Oups!',
                  'Impossible d\'envoyer les données sur le serveur.',
                  'error'
                ).then();
              }
            });
        }
      } else {
        this.updateLocataire();
      }
    }

    updateLocataire() {
      this.locataireService.updateLocataire(this.locataireForm.value, this.editData.id)
        .subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Locataire modifié avec succès.',
              showConfirmButton: false,
              timer: 1500
            }).then();
            this.locataireForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            Swal.fire(
              'Oups!',
              'Impossible de modifier ce testeur.',
              'error'
            ).then();
          }
        });
    }

}
