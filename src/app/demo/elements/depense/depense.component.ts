import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit, AfterViewInit{


  depenses : Depense[];
  depenseForm: FormGroup;
  categories = Object.values(Categorie);
  bandes : Bande[];
  headers: any

  title = 'Liste Des Dépenses'
  displayedColumns: string[] = ['id', 'dateDepense', 'categorie', 'quantite', 'prixUnitaire', 'montant', 'description', 'bande' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  depense : Depense = {
    id: 0,
    dateDepense: '',
    categorie: '',
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
        categorie: ['', Validators.required],
        quantite: [0, Validators.required],
        prixUnitaire: [0, Validators.required],
        montant: [0, Validators.required],
        description: [''],
        bande: [null, Validators.required]
      });
  
    }


    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.loadDepenseList(this.headers)
      this.loadBandeList(this.headers);
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    loadDepenseList(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.depenseService.getAllDepenses(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des dépenses!!!")
        }
      })
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


    // Suppression
  deleteDepense(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette dépense ?',
      text: 'La dépense sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        this.depenseService.deleteDepense(id, headers)
          .subscribe({
            next: (_res) => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'La dépense a été supprimé avec succès.',
                icon: 'success'
              });
              this.loadDepenseList(this.headers);
            },
            error: (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer cette dépense.',
                icon: 'error'
              });
              this.loadDepenseList(this.headers);
            }
          });
      }
    });
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
