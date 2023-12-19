import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Vente } from '../../models/vente.model';
import { Client } from '../../models/client.model';
import { Tresorerie } from '../../models/tresorerie.model';
import { Bande } from '../../models/bande.model';

import { VenteService } from '../../services/vente.service';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { TresorerieService } from '../../services/tresorerie.service';
import { BandeService } from '../../services/bande.service';
import { MatDialog } from '@angular/material/dialog';
import { EditVenteComponent } from './dialog/edit-vente/edit-vente.component';
import { AddVenteComponent } from './dialog/add-vente/add-vente.component';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  ventes: Vente[];
  venteForm: FormGroup;
  tresoreries: Tresorerie[];
  clients: Client[] = [];
  filteredClients: Client[] = [];
  bandes: Bande[];
  totalMontant: number = 0;
  headers : any;

  constructor(
    private venteService: VenteService,
    private fb: FormBuilder,
    private tresoreriService: TresorerieService,
    private bandeService: BandeService,
    public authService: AuthService,
    private clientService: ClientService,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des ventes.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadVenteList(headers);
    this.loadClientList();
    this.loadTresorerieList(headers);
    this.loadBandeList(headers);

    this.venteForm = this.fb.group({
      quantite: new FormControl(),
      prixUnitaire: new FormControl(),
      montant: new FormControl(),
      description: new FormControl(),
      client: new FormControl(),
      bande: new FormControl(),
      tresorerie: new FormControl()
    });
  }


  loadClientList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.clientService.getAllClients(headers).subscribe(
        (data: Client[]) => {
          this.clients = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des client:', error);
        }
      );
    }
  }

  loadVenteList(headers: any) {
    this.venteService.getAllVentes(headers).subscribe(
      (data: Vente[]) => {
        this.ventes = data;
        this.calculateTotalMontant();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des ventes.'
        });

        console.error('Erreur lors de la récupération des ventes :', error);
      }
    );
  }


  loadTresorerieList(headers: any) {
    this.tresoreriService.getAllTresoreries(headers).subscribe(
      (data: Tresorerie[]) => {
        this.tresoreries = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des trésoreries.'
        });
        console.error('Erreur lors de la récupération des trésoreries :', error);
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

  private calculateTotalMontant(): void {
    this.totalMontant = this.ventes.reduce((total, vente) => total + vente.montant, 0);
  }



  openDialogEdit(vente: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditVenteComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: vente,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadVenteList(this.headers)
          }
      });
  }


  openAddDialog(): void {
    // Ouvrez le dialogue
    const dialogRef = this._matDialog.open(AddVenteComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass: 'my-panelClass-dialog',
      width: '50%',
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log("Result from dialog:", result);
        if (result === true) {
          this.loadVenteList(this.headers);
        }
      });
  }

}
