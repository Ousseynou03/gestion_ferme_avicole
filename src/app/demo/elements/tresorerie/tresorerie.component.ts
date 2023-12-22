import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TresorerieService } from '../../services/tresorerie.service';
import Swal from 'sweetalert2';
import { Tresorerie } from '../../models/tresorerie.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTresorerieComponent } from './dialog/edit-tresorerie/edit-tresorerie.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tresorerie',
  templateUrl: './tresorerie.component.html',
  styleUrls: ['./tresorerie.component.scss']
})
export class TresorerieComponent implements OnInit, AfterViewInit{


  tresoreries : Tresorerie[];

  tresorerieForm : FormGroup;
  headers : any;

  title = 'Liste Des Trésorerie'
  displayedColumns: string[] = ['id', 'type', 'nom', 'numero', 'solde', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  tresorerie : Tresorerie = {
    id: 0,
    type: '',
    nom: '',
    numero: '',
    solde: 0
  }

  constructor(private tresoreriService : TresorerieService, public authService : AuthService,private _matDialog: MatDialog,
    private fb : FormBuilder){
      this.tresorerieForm = this.fb.group({
        type: ['', Validators.required],
        nom: ['', Validators.required],
        numero: ['', Validators.required],
        solde: [0, Validators.required]
      });
    }


    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.loadTresorerieList(this.headers)
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    loadTresorerieList(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.tresoreriService.getAllTresoreries(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des trésoreries!!!")
        }
      })
    }

  addTresorerie() {
    if (this.tresorerieForm.valid) {
      const tresorerie = this.tresorerieForm.value;
  
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
  
      this.tresoreriService.addTresorerie(tresorerie, headers).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Trésorerie ajoutée avec succès'
          });
  
          console.log('Trésorerie enregistrée:', response);
          this.loadTresorerieList(headers);
          // Réinitialisez le formulaire après l'ajout réussi
          this.tresorerieForm.reset();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Enregistrement non autorisé',
            text: "Vous n'êtes pas autorisé à enregistrer une trésorerie."
          });
  
          console.error('Erreur lors de l\'enregistrement d\'une trésorerie:', error);
        }
      );
    }
  }







    // Suppression
    deleteTresorerie(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer cette trésorerie ?',
        text: 'La trésorerie sera définitivement supprimée!',
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
    
          this.tresoreriService.deleteTresorerie(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'La trésorerie a été supprimé avec succès.',
                icon: 'success'
              });
              this.tresoreriService.getAllTresoreries(headers).subscribe(updatedTresoreries => {
                this.tresoreries = updatedTresoreries;
              });
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer cette trésorerie.',
                icon: 'error'
              });
            }
          );
        }
      });
    }



    openDialogEdit(tresorerie: any) :void{
      // Open the dialog
      const dialogRef = this._matDialog.open(EditTresorerieComponent, {
        backdropClass: 'my-full-screen-dialog',
        panelClass:'my-panelClass-dialog',
        width:'50%',
        data: tresorerie,
        disableClose: true
    });
  
    dialogRef.afterClosed()
        .subscribe((result) => {
            console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
            if(result == true){
  
              this.loadTresorerieList(this.headers)
            }
        });
    }

}
