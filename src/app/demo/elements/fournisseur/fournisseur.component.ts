import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Fournisseur } from '../../models/fournisseur.model';
import { FournisseurService } from '../../services/fournisseur.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditFournisseurComponent } from './dialog/edit-fournisseur/edit-fournisseur.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit, AfterViewInit{

  fournisseurs: Fournisseur[] = [];
  fournisseurForm: FormGroup;
  headers : any;

  title = 'Liste Des Fournisseurs'
  displayedColumns: string[] = ['id', 'type', 'nom', 'numTel', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  fournisseur : Fournisseur = {
    id : null,
    type : '',
    nom: '',
    numTel: '',
    email: ''
  }


  constructor(private fournisseurService: FournisseurService, public authService: AuthService,private _matDialog: MatDialog,
    private fb : FormBuilder){
      this.fournisseurForm = this.fb.group({
        type: ['Particulier', Validators.required],
        nom: ['', Validators.required],
        numTel: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }

    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.loadFournisseurList(this.headers)
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    loadFournisseurList(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.fournisseurService.getAllFournisseurs(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des fournisseurs!!!")
        }
      })
    }



  //Ajout
  addFournisseur() {
    if (this.fournisseurForm.valid) {
      const fournisseur = this.fournisseurForm.value;

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

      this.fournisseurService.addFournisseur(fournisseur, headers).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Fournisseur ajouté avec succès'
          });

          console.log('Fournisseur enregistré:', response);
          this.loadFournisseurList(this.headers);
          this.fournisseurForm.reset();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Enregistrement non autorisé',
            text: "Vous n'êtes pas autorisé à enregistrer un fournisseur."
          });

          console.error('Erreur lors de l\'enregistrement d\'un fournisseur:', error);
        }
      );
    }
  }



  //Suppession
  deleteFounisseur(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce founisseur ?',
      text: 'Le founisseur sera définitivement supprimé!',
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
  
        this.fournisseurService.deleteFournisseur(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le fournisseur a été supprimé avec succès.',
              icon: 'success'
            });
            this.loadFournisseurList(this.headers);
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce founisseur.',
              icon: 'error'
            });
          }
        );
      }
    });
  }



  openDialogEdit(fournisseur: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditFournisseurComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: fournisseur,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadFournisseurList(this.headers);
          }
      });
  }

}
