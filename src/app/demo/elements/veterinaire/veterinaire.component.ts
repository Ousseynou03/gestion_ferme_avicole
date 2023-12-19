import { Component } from '@angular/core';
import { Bande } from '../../models/bande.model';
import { Veterinaire } from '../../models/veterinaire.model';
import { FormBuilder, Validators } from '@angular/forms';
import { BandeService } from '../../services/bande.service';
import { AuthService } from '../../services/auth.service';
import { VeterinaireService } from '../../services/veterinaire.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditVenteComponent } from '../vente/dialog/edit-vente/edit-vente.component';
import { EditVetoComponent } from './dialog/edit-veto/edit-veto.component';

@Component({
  selector: 'app-veterinaire',
  templateUrl: './veterinaire.component.html',
  styleUrls: ['./veterinaire.component.scss']
})
export class VeterinaireComponent {

  bandes: Bande[];
  veterinaires: Veterinaire[];

  headers: any


  veterinaireForm = this.fb.group({
    date: ['', Validators.required],
    nomVeterinaire: ['', Validators.required],
    traitement: ['', Validators.required],
    posologie: ['', Validators.required],
    bande: [null,Validators.required]
  });

  constructor(
    private bandeService: BandeService,
    public authService: AuthService,
    private veterinaireService: VeterinaireService,
    private fb: FormBuilder,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des véterinaires.'
      });
      return;
    }

     this.headers = { Authorization: `Bearer ${token}` };
    this.loadBandeList(this.headers);
    this.loadVeterinaireList(this.headers);
  }

  loadBandeList(headers: any) {
    this.bandeService.getAllBandes(headers).subscribe(
      (data: Bande[]) => {
        this.bandes = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des bandes.'
        });
  
        console.error('Erreur lors de la récupération des bandes :', error);
      }
    );
  }
  

  loadVeterinaireList(headers: any) {
    this.veterinaireService.getAllVeterinaire(headers).subscribe(vetos => {
      this.veterinaires = vetos;
    });
  }

  

  onSubmit() {
    if (this.veterinaireForm.valid) {
      const veterinaire: Veterinaire = {
        id: null,
        date: this.veterinaireForm.value.date,
        nomVeterinaire: this.veterinaireForm.value.nomVeterinaire,
        traitement: this.veterinaireForm.value.traitement,
        posologie: this.veterinaireForm.value.posologie,
        bande: this.veterinaireForm.value.bande,
      };
  
      console.log('Valeur de bande avant envoi:', this.veterinaireForm.value.bande);
  
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
  
      this.veterinaireService.addVeterinaire(veterinaire, headers).subscribe(
        (createdveterinaire) => {
          console.log('Product created successfully:', createdveterinaire);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le Vétérinaire a été ajouté avec succès.'
          });
          this.veterinaireForm.reset();
          this.loadVeterinaireList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du veterinaire:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du veterinaire.'
          });
        }
      );
    }
  }

  // Suppression
  deleteVeterinaire(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce Veterinaire ?',
      text: 'Le Veterinaire sera définitivement supprimé!',
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
  
        this.veterinaireService.deleteVeterinaire(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le Veterinaire a été supprimé avec succès.',
              icon: 'success'
            });
            this.veterinaireService.getAllVeterinaire(headers).subscribe(updatedveterinaires => {
              this.veterinaires = updatedveterinaires;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce Veterinaire.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  

  openDialogEdit(veterinaire: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditVetoComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: veterinaire,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadVeterinaireList(this.headers)
          }
      });
  }

}
