import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Ouvrier } from '../../models/ouvrier.model';
import { OuvrierService } from '../../services/ouvrier.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditOuvrierComponent } from './dialog/edit-ouvrier/edit-ouvrier.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ouvrier',
  templateUrl: './ouvrier.component.html',
  styleUrls: ['./ouvrier.component.scss']
})
export class OuvrierComponent implements OnInit, AfterViewInit{

  ouvriers: Ouvrier[] = [];

  ouvrierForm: FormGroup;
  headers : any


  title = 'Liste Des Ouvriers'
  displayedColumns: string[] = ['id', 'fonction', 'nom', 'numTel', 'ville', 'salaire', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  

  ouvrier: Ouvrier = {
    id : null,
    fonction: '',
    nom: '',
    numTel: '',
    ville: '',
    salaire: 0
  };
  

  constructor(private ouvrierService: OuvrierService,
    public authService : AuthService,private _matDialog: MatDialog,
    private fb : FormBuilder) {
      this.ouvrierForm = this.fb.group({
        fonction: ['', Validators.required],
        nom: ['', Validators.required],
        numTel: ['', Validators.required],
        ville: ['', Validators.required],
        salaire: [0, Validators.required],
      });
    }

    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.loadOuvrierList(this.headers)
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    loadOuvrierList(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.ouvrierService.getAllOuvriers(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des ouvriers!!!")
        }
      })
    }



//Ajout
addOuvrier() {
  if (this.ouvrierForm.valid) {
    const ouvrier = this.ouvrierForm.value;

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

    this.ouvrierService.addOuvrier(ouvrier, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Ouvrier ajouté avec succès'
        });

        console.log('Ouvrier enregistré:', response);
        this.loadOuvrierList(this.headers);
        // Réinitialisez le formulaire après l'ajout réussi
        this.ouvrierForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n'êtes pas autorisé à enregistrer un ouvrier."
        });

        console.error('Erreur lors de l\'enregistrement d\'un ouvrier:', error);
      }
    );
  }
}


// Suppression
  deleteOuvrier(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet ouvrier ?',
      text: 'L\' ouvrier sera définitivement supprimé!',
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
  
        this.ouvrierService.deleteOuvrier(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L\' ouvrier a été supprimé avec succès.',
              icon: 'success'
            });
            this.ouvrierService.getAllOuvriers(headers).subscribe(updatedOuvrier => {
              this.ouvriers = updatedOuvrier;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cet ouvrier.',
              icon: 'error'
            });
          }
        );
      }
    });

}



openDialogEdit(ouvrier: any) :void{
  // Open the dialog
  const dialogRef = this._matDialog.open(EditOuvrierComponent, {
    backdropClass: 'my-full-screen-dialog',
    panelClass:'my-panelClass-dialog',
    width:'50%',
    data: ouvrier,
    disableClose: true
});

dialogRef.afterClosed()
    .subscribe((result) => {
        console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
        if(result == true){

          this.loadOuvrierList(this.headers);
        }
    });
}

}
