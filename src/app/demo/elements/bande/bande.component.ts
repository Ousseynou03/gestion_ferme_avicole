import { Component, OnInit } from '@angular/core';
import { Bande } from '../../models/bande.model';
import { BandeService } from '../../services/bande.service';
import { AuthService } from '../../services/auth.service';
import { BatimentService } from '../../services/batiment.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './dialog/edit/edit.component';

@Component({
  selector: 'app-bande',
  templateUrl: './bande.component.html',
  styleUrls: ['./bande.component.scss']
})
export class BandeComponent implements OnInit {

  bandes: Bande[];
  batiments: Batiment[];

  headers: any


  bandeForm = this.fb.group({
    code: ['', Validators.required],
    designation: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    effectifdepart: [null, Validators.required],
    batiment: [null,Validators.required]
  });

  constructor(
    private bandeService: BandeService,
    public authService: AuthService,
    private batimentService: BatimentService,
    private fb: FormBuilder,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des bandes.'
      });
      return;
    }

     this.headers = { Authorization: `Bearer ${token}` };
    this.loadBandeList(this.headers);
    this.loadBatimentList(this.headers);
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
  

  loadBatimentList(headers: any) {
    this.batimentService.getAllBatiments(headers).subscribe(batiments => {
      this.batiments = batiments;
    });
  }

  

  onSubmit() {
    if (this.bandeForm.valid) {
      const bande: Bande = {
        id: null,
        code: this.bandeForm.value.code,
        designation: this.bandeForm.value.designation,
        dateDebut: this.bandeForm.value.dateDebut,
        dateFin: this.bandeForm.value.dateFin,
        effectifdepart: this.bandeForm.value.effectifdepart,
        batiment: this.bandeForm.value.batiment,
      };
  
      console.log('Valeur de batiment avant envoi:', this.bandeForm.value.batiment);
  
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
  
      this.bandeService.addBande(bande, headers).subscribe(
        (createdBande) => {
          console.log('Product created successfully:', createdBande);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La bande a été ajoutée avec succès.'
          });
          this.bandeForm.reset();
          this.loadBandeList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la bande:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la bande.'
          });
        }
      );
    }
  }

  // Suppression
  deleteBande(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette Bande ?',
      text: 'La Bande sera définitivement supprimé!',
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
  
        this.bandeService.deleteBande(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'La Bande a été supprimé avec succès.',
              icon: 'success'
            });
            this.bandeService.getAllBandes(headers).subscribe(updatedBandes => {
              this.bandes = updatedBandes;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cette bande.',
              icon: 'error'
            });
          }
        );
      }
    });
  }
  

  openDialogEdit(bande: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: bande,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadBandeList(this.headers)
          }
      });
  }


  generateRapportPdf(bandeId: number) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    this.bandeService.getRapportUrl(bandeId, headers).subscribe(
      (pdfBlob: Blob) => {
        // Créez un objet URL à partir du Blob
        const url = window.URL.createObjectURL(pdfBlob);
  
        // Ouvrez le PDF dans une nouvelle fenêtre
        const newWindow = window.open(url, '_blank');
  
        if (!newWindow) {
          // La fenêtre popup a été bloquée par le navigateur
          console.error('La fenêtre popup a été bloquée. Veuillez autoriser les popups dans votre navigateur.');
        }
      },
      error => {
        console.error('Erreur lors de la récupération du rapport PDF', error);
  
        // Gérez l'erreur selon vos besoins
        // Par exemple, affichez un message à l'utilisateur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la récupération du rapport PDF. Veuillez réessayer plus tard.'
        });
      }
    );
  }
}