import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BatimentService } from '../../services/batiment.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditBatimentComponent } from './dialog/edit-batiment/edit-batiment.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-batiment',
  templateUrl: './batiment.component.html',
  styleUrls: ['./batiment.component.scss']
})
export class BatimentComponent implements OnInit, AfterViewInit{

  batiments: Batiment[] = [];
  batimentForm: FormGroup;
  headers : any;


  title = 'Liste Des Batiments'
  displayedColumns: string[] = ['id', 'code', 'designation', 'capacite', 'dimension', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;







  batiment: Batiment = {
    id : null,
    code : '',
    designation : '',
    capacite : '',
    dimension : ''
  };

  

  constructor(private batimentService: BatimentService, public authService: AuthService, private fb: FormBuilder,private _matDialog: MatDialog) {
    this.batimentForm = this.fb.group({
      code: ['', Validators.required],
      designation: ['', Validators.required],
      capacite: ['', Validators.required],
      dimension: ['', Validators.required],
    });
  }


    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.getAllBatiment(this.headers)
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    getAllBatiment(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.batimentService.getAllBatiments(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des batiments!!!")
        }
      })
    }

//Ajout
addBatiment() {
  if (this.batimentForm.valid) {
    const batiment: Batiment = {
      id: null,
      code: this.batimentForm.value.code,
      designation: this.batimentForm.value.designation,
      capacite: this.batimentForm.value.capacite,
      dimension: this.batimentForm.value.dimension,
    };

    const token = localStorage.getItem('token');

    if (!token) {
      // Gérer le cas où l'utilisateur n'est pas connecté
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté...'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.batimentService.addBatiment(batiment, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Batiment ajouté avec succès'
        });

        console.log('Batiment enregistré:', response);
        this.getAllBatiment(headers);
        this.batimentForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n'êtes pas autorisé à enregistrer un batiment."
        });

        console.error('Erreur lors de l\'enregistrement d\'un batiment:', error);
      }
    );
  }
}

    loadBatimentList(header : any) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.batimentService.getAllBatiments(headers).subscribe(
          (data: Batiment[]) => {
            this.batiments = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des batiments:', error);
          }
        );
      }
    }


// Suppression
  deleteBatiment(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce batiment ?',
      text: 'Le batiment sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        this.batimentService.deleteBatiment(id, headers)
          .subscribe({
            next: (_res) => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'Le batiment a été supprimé avec succès.',
                icon: 'success'
              });
              this.getAllBatiment(this.headers);
            },
            error: (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer ce testeur.',
                icon: 'error'
              });
              this.getAllBatiment(this.headers);
            }
          });
      }
    });
  }
  

  openDialogEdit(batiment: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditBatimentComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: batiment,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadBatimentList(this.headers)
          }
      });
  }











  }

