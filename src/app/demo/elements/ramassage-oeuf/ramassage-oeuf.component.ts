import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RamassageOeufService } from '../../services/ramassage-oeuf.service';
import { BandeService } from '../../services/bande.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Ramassage } from '../../models/ramassage.model';
import { Bande } from '../../models/bande.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditRamassageOeufComponent } from './dialog/edit-ramassage-oeuf/edit-ramassage-oeuf.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ramassage-oeuf',
  templateUrl: './ramassage-oeuf.component.html',
  styleUrls: ['./ramassage-oeuf.component.scss']
})
export class RamassageOeufComponent implements OnInit, AfterViewInit{


  ramassages: Ramassage[];
  bandes: Bande[];
  headers : any;

  title = 'Liste Des Ramassages Oeufs'
  displayedColumns: string[] = ['id', 'observation', 'quantite', 'nbrOeufCasse', 'nbrOeufPerdu', 'nbrPlateauOeuf', 'dateRamassage', 'bande', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ramassageForm = this.fb.group({
    observation: [null, Validators.required],
    quantite: ['', Validators.required],
    nbrOeufCasse : [null, Validators.required],
    nbrOeufPerdu : [null, Validators.required],
    nbrPlateauOeuf : [null, Validators.required],
    dateRamassage : ['', Validators.required],
    bande: [null, Validators.required],
  });

  constructor(
    private ramassageService : RamassageOeufService,
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
    this.loadBandeList(this.headers);
    this.loadRamassageList(this.headers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadRamassageList(header : any){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    this.ramassageService.getAllRamassages(headers)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de recupere la liste des ramassages!!!")
      }
    })
  }


  loadBandeList(headers: any) {
    this.bandeService.getAllBandes(headers).subscribe(bandes => {
      this.bandes = bandes;
    });
  }


  addRamassage() {
    if (this.ramassageForm.valid) {
      const ramassage: Ramassage = {
        id: null,
        observation: this.ramassageForm.value.observation,
        quantite: this.ramassageForm.value.quantite,
        nbrOeufCasse: this.ramassageForm.value.nbrOeufCasse,
        nbrOeufPerdu: this.ramassageForm.value.nbrOeufPerdu,
        dateRamassage: this.ramassageForm.value.dateRamassage,
        bande: this.ramassageForm.value.bande,
        nbrPlateauOeuf: this.ramassageForm.value.nbrPlateauOeuf,
      };
  
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
  
      this.ramassageService.addRamassageOeuf(ramassage, headers).subscribe(
        (createdRamassage) => {
          console.log('Ramassage created successfully:', createdRamassage);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le Ramassage a été ajoutée avec succès.'
          });
          this.ramassageForm.reset();
          this.loadRamassageList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du ramassage:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du ramassage.'
          });
        }
      );
    }
  }




    // Suppression
    deleteRamassage(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer ce ramassage ?',
        text: 'Le Ramassage sera définitivement supprimé!',
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
    
          this.ramassageService.deleteRamassage(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'Le Ramassage a été supprimé avec succès.',
                icon: 'success'
              });
              this.loadRamassageList(this.headers)
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer ce ramassage.',
                icon: 'error'
              });
            }
          );
        }
      });
    }


    openDialogEdit(ramassage: any) :void{
      // Open the dialog
      const dialogRef = this._matDialog.open(EditRamassageOeufComponent, {
        backdropClass: 'my-full-screen-dialog',
        panelClass:'my-panelClass-dialog',
        width:'50%',
        data: ramassage,
        disableClose: true
    });
  
    dialogRef.afterClosed()
        .subscribe((result) => {
            console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
            if(result == true){
  
              this.loadRamassageList(this.headers)
            }
        });
    }

}
