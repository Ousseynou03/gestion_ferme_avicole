import { Component } from '@angular/core';
import { Paiement } from '../../models/paiement.model';
import { Locataire } from '../../models/locataire.model';
import { FormBuilder, Validators } from '@angular/forms';
import { PaiementService } from '../../services/paiement.service';
import { AuthService } from '../../services/auth.service';
import { LocataireService } from '../../services/locataire.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditPaiementComponent } from './dialog/edit-paiement/edit-paiement.component';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent {

  paiements: Paiement[];
  locataires: Locataire[];

  headers: any


  paiementForm = this.fb.group({
    montant: [null, Validators.required],
    datePaiement: ['', Validators.required],
    locataire: [null, Validators.required],
  });

  constructor(
    private paiementService: PaiementService,
    public authService: AuthService,
    private locataireService: LocataireService,
    private fb: FormBuilder,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des paiements.'
      });
      return;
    }

     this.headers = { Authorization: `Bearer ${token}` };
    this.loadPaiementList(this.headers);
    this.loadLocataireList(this.headers);
  }

  loadPaiementList(headers: any) {
    this.paiementService.getAllPaiement(headers).subscribe(
      (data: Paiement[]) => {
        this.paiements = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des paiements.'
        });
  
        console.error('Erreur lors de la récupération des paiements :', error);
      }
    );
  }
  

  loadLocataireList(headers: any) {
    this.locataireService.getAllLocataires(headers).subscribe(data => {
      this.locataires = data;
    });
  }

  

  onSubmit() {
    if (this.paiementForm.valid) {
      const paiement: Paiement = {
        id: null,
        montant: this.paiementForm.value.montant,
        datePaiement: this.paiementForm.value.datePaiement,
        locataire: this.paiementForm.value.locataire,
  
      };
  
      console.log('Valeur de batiment avant envoi:', this.paiementForm.value.locataire);
  
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
  
      this.paiementService.addPaiement(paiement, headers).subscribe(
        (createdPaiement) => {
          console.log('Product created successfully:', createdPaiement);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le paiement a été ajouté avec succès.'
          });
          this.paiementForm.reset();
          this.loadPaiementList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Paiement:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du paiment.'
          });
        }
      );
    }
  }

  // Suppression
  deletePaiment(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce paiment ?',
      text: 'Le Paiement sera définitivement supprimé!',
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
  
        this.paiementService.deletePaiement(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le Paiement a été supprimé avec succès.',
              icon: 'success'
            });
            this.paiementService.getAllPaiement(headers).subscribe(updatedpaiements => {
              this.paiements = updatedpaiements;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce paiement.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  

  openDialogEdit(paiement: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditPaiementComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: paiement,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadPaiementList(this.headers)
          }
      });
  }

}
