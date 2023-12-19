import { Component } from '@angular/core';
import { ContratLocation } from '../../models/contrat-location.model';
import { Locataire } from '../../models/locataire.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ContratLocationService } from '../../services/contrat-location.service';
import { AuthService } from '../../services/auth.service';
import { LocataireService } from '../../services/locataire.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditContratLocationComponent } from './dialog/edit-contrat-location/edit-contrat-location.component';

@Component({
  selector: 'app-contrat-location',
  templateUrl: './contrat-location.component.html',
  styleUrls: ['./contrat-location.component.scss']
})
export class ContratLocationComponent {


  contratLocations: ContratLocation[];
  locataires: Locataire[];

  headers: any


  contratLocationForm = this.fb.group({
    dateDebut: [null, Validators.required],
    dateFin: ['', Validators.required],
    locataire: [null, Validators.required],
  });

  constructor(
    private contratLocationService: ContratLocationService,
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
        text: 'Vous devez être connecté pour récupérer la liste des contrats.'
      });
      return;
    }

     this.headers = { Authorization: `Bearer ${token}` };
    this.loadContratLocationList(this.headers);
    this.loadLocataireList(this.headers);
  }

  loadContratLocationList(headers: any) {
    this.contratLocationService.getAllContratLocation(headers).subscribe(
      (data: ContratLocation[]) => {
        this.contratLocations = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des contrats.'
        });
  
        console.error('Erreur lors de la récupération des contrats :', error);
      }
    );
  }
  

  loadLocataireList(headers: any) {
    this.locataireService.getAllLocataires(headers).subscribe(data => {
      this.locataires = data;
    });
  }

  

  onSubmit() {
    if (this.contratLocationForm.valid) {
      const contratLocation: ContratLocation = {
        id: null,
        dateDebut: this.contratLocationForm.value.dateDebut,
        dateFin: this.contratLocationForm.value.dateFin,
        locataire: this.contratLocationForm.value.locataire,
  
      };
  
      console.log('Valeur de contrat avant envoi:', this.contratLocationForm.value.locataire);
  
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
  
      this.contratLocationService.addContratLocation(contratLocation, headers).subscribe(
        (contratLocation) => {
          console.log('Product created successfully:', contratLocation);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le contrat a été ajouté avec succès.'
          });
          this.contratLocationForm.reset();
          this.loadContratLocationList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Paiement:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du contrat.'
          });
        }
      );
    }
  }

  // Suppression
  deleteContratLocation(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce contrat ?',
      text: 'Le contrat sera définitivement supprimé!',
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
  
        this.contratLocationService.deleteContratLocation(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le contrat a été supprimé avec succès.',
              icon: 'success'
            });
            this.contratLocationService.getAllContratLocation(headers).subscribe(updatedcontrats => {
              this.contratLocations = updatedcontrats;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce contrat.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  

  openDialogEdit(contratLocation: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditContratLocationComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: contratLocation,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadContratLocationList(this.headers)
          }
      });
  }

}
