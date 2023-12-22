import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit, AfterViewInit {
  ventes: Vente[];
  venteForm: FormGroup;
  tresoreries: Tresorerie[];
  clients: Client[] = [];
  filteredClients: Client[] = [];
  bandes: Bande[];
  totalMontant: number = 0;
  headers : any;


  title = 'Liste Des Ventes'
  displayedColumns: string[] = ['id', 'quantite', 'prixUnitaire', 'montant', 'description', 'client', 'bande', 'tresorerie', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private venteService: VenteService,
    private fb: FormBuilder,
    private tresoreriService: TresorerieService,
    private bandeService: BandeService,
    public authService: AuthService,
    private clientService: ClientService,
    private _matDialog: MatDialog,
  ) {}


  ngAfterViewInit() {
    if(this.paginator === undefined){
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit(): void {
    this.loadVenteList(this.headers)
    this.loadClientList();
    this.loadTresorerieList(this.headers);
    this.loadBandeList(this.headers);

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadVenteList(header : any){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    this.venteService.getAllVentes(headers)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de recupere la liste des ventes!!!")
      }
    })
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
