import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../../services/depense.service';
import { BandeService } from '../../services/bande.service';
import Swal from 'sweetalert2';
import { Bande } from '../../models/bande.model';
import { Depense } from '../../models/depense.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../models/enums/categorie.enum';
import { MatDialog } from '@angular/material/dialog';
import { EditDepenseComponent } from './dialog/edit-depense/edit-depense.component';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit{


  depenses : Depense[];
  depenseForm: FormGroup;
  categories = Object.values(Categorie);
  bandes : Bande[];
  headers: any

  depense : Depense = {
    id: 0,
    dateDepense: '',
    categorie: null,
    quantite: 0,
    prixUnitaire: 0,
    montant: 0,
    description: '',
    bande: undefined
  }

  constructor(private depenseService : DepenseService,
    private bandeService : BandeService,
    public authService : AuthService,
    private fb : FormBuilder,
    private _matDialog: MatDialog){
      this.depenseForm = this.fb.group({
        dateDepense: ['', Validators.required],
        categorie: [null, Validators.required],
        quantite: [0, Validators.required],
        prixUnitaire: [0, Validators.required],
        montant: [0, Validators.required],
        description: [''],
        bande: [null, Validators.required]
      });
  
    }


    ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour récupérer la liste des dépenses.'
        });
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      this.loadDepenseList(headers);
      this.loadBandeList(headers);
    }

    addDepense() {
      if (this.depenseForm.valid) {
        const depense: Depense = this.depenseForm.value;
  
        const token = localStorage.getItem('token');
        
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous devez être connecté...'
          });
          return;
        }
  
        const headers = { Authorization: `Bearer ${token}` }
  
        this.depenseService.addDepense(depense, headers).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Enregistré',
              text: 'Dépense ajoutée avec succès'
            });
  
            console.log('Dépense enregistrée:', response);
  
            this.loadDepenseList(headers);
            this.depenseForm.reset();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Enregistrement non autorisé',
              text: "Vous n'êtes pas autorisé à enregistrer une dépense."
            });
  
            console.error('Erreur lors de l\'enregistrement d\'une dépense:', error);
          }
        );
      }
    }

    loadDepenseList(headers: any) {
      this.depenseService.getAllDepenses(headers).subscribe(
        (data: Depense[]) => {
          this.depenses = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: 'Impossible de récupérer la liste des dépenses.'
          });
    
          console.error('Erreur lors de la récupération des dépenses :', error);
        }
      );
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


    openDialogEdit(depense: any) :void{
      // Open the dialog
      const dialogRef = this._matDialog.open(EditDepenseComponent, {
        backdropClass: 'my-full-screen-dialog',
        panelClass:'my-panelClass-dialog',
        width:'50%',
        data: depense,
        disableClose: true
    });
  
    dialogRef.afterClosed()
        .subscribe((result) => {
            console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
            if(result == true){
  
              this.loadDepenseList(this.headers)
            }
        });
    }
  

    
}
