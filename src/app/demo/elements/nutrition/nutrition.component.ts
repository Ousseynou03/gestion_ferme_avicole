import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Nutrition } from '../../models/nutrition.model';
import { Bande } from '../../models/bande.model';
import { FormBuilder, Validators } from '@angular/forms';
import { BandeService } from '../../services/bande.service';
import { BatimentService } from '../../services/batiment.service';
import { AuthService } from '../../services/auth.service';
import { NutritionService } from '../../services/nutrition.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';
import { MatDialog } from '@angular/material/dialog';
import { EditNutritionComponent } from './dialog/edit-nutrition/edit-nutrition.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit, AfterViewInit{

  nutritions: Nutrition[];
  batiments: Batiment[];
  bandes : Bande[];
  headers: any;

  title = 'Liste Des Nutritions'
  displayedColumns: string[] = ['id', 'designation', 'quantite', 'date Entree', 'date Sortie', 'quantite Sortie', 'batiment', 'bande', 'epuisee', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  NutritionForm = this.fb.group({
    designation: ['', Validators.required],
    quantite: [null, Validators.required],
    dateEntree: ['', Validators.required],
    dateSortie: ['', Validators.required],
    quantiteSortie: [null, Validators.required],
    batiment: [null,Validators.required],
    bande: [null,Validators.required],
    epuisee : ['', Validators.required],
  });

  constructor(
    private nutritionService : NutritionService,
    public authService: AuthService,
    private batimentService: BatimentService,
    private fb: FormBuilder,
    private bandeService : BandeService,
    private _matDialog: MatDialog
  ) {}


  ngAfterViewInit() {
    if(this.paginator === undefined){
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit(): void {
    this.getAllNutrition(this.headers)
    this.loadBatimentList(this.headers);
    this.loadBandeList(this.headers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllNutrition(header : any){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    this.nutritionService.getAllNutritions(headers)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de recupere la liste des nutritions!!!")
      }
    })
  }


  loadNutritionList(headers: any) {
    this.nutritionService.getAllNutritions(headers).subscribe(
      (data: Nutrition[]) => {
        this.nutritions = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des nutritions.'
        });
  
        console.error('Erreur lors de la récupération des nutritions :', error);
      }
    );
  }
  

  loadBatimentList(headers: any) {
    this.batimentService.getAllBatiments(headers).subscribe(batiments => {
      this.batiments = batiments;
    });
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
  

  addNutrition() {
    if (this.NutritionForm.valid) {
      const nutrition: Nutrition = {
        id: 0,
        designation: this.NutritionForm.value.designation,
        quantite: this.NutritionForm.value.quantite,
        dateEntree: this.NutritionForm.value.dateEntree,
        dateSortie: this.NutritionForm.value.dateSortie,
        quantiteSortie: this.NutritionForm.value.quantiteSortie,
        batiment: this.NutritionForm.value.batiment,
        bande: this.NutritionForm.value.bande,
        epuisee : this.NutritionForm.value.epuisee,
      };
  
      console.log('Valeur de batiment avant envoi:', this.NutritionForm.value.batiment);
  
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
  
      this.nutritionService.addNutrition(nutrition, headers).subscribe(
        (createdNutrition) => {
          console.log('Nutrition created successfully:', createdNutrition);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La Nutrition a été ajoutée avec succès.'
          });
          this.getAllNutrition(headers);
          this.NutritionForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la nutrition:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la nutrition.'
          });
        }
      );
    }
  }

  // Suppression
deleteNutrition(id: number) {
  Swal.fire({
    title: 'Voulez-vous vraiment supprimer cette Nutrition ?',
    text: 'La Nutrition sera définitivement supprimé!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer!'
  }).then((result) => {
    if (result.value) {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.nutritionService.deleteNutrition(id, headers)
        .subscribe({
          next: (_res) => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'La Nutrion a été supprimé avec succès.',
              icon: 'success'
            });
            this.getAllNutrition(this.headers);
          },
          error: (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cette Nutrion.',
              icon: 'error'
            });
            this.getAllNutrition(this.headers);
          }
        });
    }
  });
}

  openDialogEdit(nutrition: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditNutritionComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: nutrition,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadNutritionList(this.headers)
          }
      });
  }

}
