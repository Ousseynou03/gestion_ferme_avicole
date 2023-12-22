import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mortalite } from '../../models/moratlite.model';
import { Bande } from '../../models/bande.model';
import { FormBuilder, Validators } from '@angular/forms';
import { MortaliteService } from '../../services/mortalite.service';
import { BandeService } from '../../services/bande.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditMortaliteComponent } from './dialog/edit-mortalite/edit-mortalite.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mortalite',
  templateUrl: './mortalite.component.html',
  styleUrls: ['./mortalite.component.scss']
})
export class MortaliteComponent implements OnInit, AfterViewInit{

  mortalites: Mortalite[];
  bandes: Bande[];
  headers : any



  title = 'Liste Des Mortalités'
  displayedColumns: string[] = ['id', 'effectif', 'dateMortalite', 'description', 'bande', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  mortaliteForm = this.fb.group({
    effectif: [null, Validators.required],
    dateMortalite: ['', Validators.required],
    description : ['', Validators.required],
    bande: [null, Validators.required],
  });

  constructor(
    private mortaliteService : MortaliteService,
    private bandeService: BandeService,
    private fb: FormBuilder,
    public authService : AuthService,
    private _matDialog: MatDialog,
  ) {}


  ngAfterViewInit() {
    if(this.paginator === undefined){
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit(): void {
    this.loadMortaliteList(this.headers)
    this.loadBandeList(this.headers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadMortaliteList(header : any){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    this.mortaliteService.getAllMortalites(headers)
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



  

  loadBandeList(headers: any) {
    this.bandeService.getAllBandes(headers).subscribe(bandes => {
      this.bandes = bandes;
    });
  }

  

  addMortalite() {
    console.log('Formulaire valide:', this.mortaliteForm.valid);

    if (this.mortaliteForm.valid) {
      const mortalite: Mortalite = {
        id: null,
        effectif: this.mortaliteForm.value.effectif,
        dateMortalite: this.mortaliteForm.value.dateMortalite,
        description: this.mortaliteForm.value.description,
        bande: this.mortaliteForm.value.bande,

      };
  
      console.log('Valeur de Mortalite avant envoi:', this.mortaliteForm.value.bande);
  
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
  
      this.mortaliteService.addMortalite(mortalite, headers).subscribe(
        (createdMortalite) => {
          console.log('Mortalite created successfully:', createdMortalite);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le Materiel a été ajoutée avec succès.'
          });
          this.loadMortaliteList(headers);
          this.mortaliteForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la bande:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la mortalité.'
          });
        }
      );
    }
  }

  // Suppression
  deleteMortalite(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette Mortalité ?',
      text: 'La Mortalité sera définitivement supprimé!',
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
  
        this.mortaliteService.deleteMortalite(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'La Mortalité a été supprimé avec succès.',
              icon: 'success'
            });
            this.loadMortaliteList(this.headers)
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cette mortalité.',
              icon: 'error'
            });
          }
        );
      }
    });
  }


  openDialogEdit(mortalite: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditMortaliteComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: mortalite,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadMortaliteList(this.headers)
          }
      });
  }

}
