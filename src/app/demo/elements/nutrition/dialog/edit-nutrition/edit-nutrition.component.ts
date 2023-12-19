import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Bande } from 'src/app/demo/models/bande.model';
import { Batiment } from 'src/app/demo/models/batiment.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { BatimentService } from 'src/app/demo/services/batiment.service';
import { NutritionService } from 'src/app/demo/services/nutrition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-nutrition',
  templateUrl: './edit-nutrition.component.html',
  styleUrls: ['./edit-nutrition.component.scss']
})
export class EditNutritionComponent {

  libelleError: string="";

  batiments: Batiment[]
  bandes : Bande[]

  filterOptions: Observable<Batiment[]>;
  filterOptionsBande: Observable<Bande[]>;

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private nutritionService : NutritionService,
  private batimentService: BatimentService,
  private bandeService : BandeService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditNutritionComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}


     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          designation: new FormControl(this.editData?.designation,Validators.required),
          quantite: new FormControl(this.editData?.quantite,Validators.required),
          dateEntree : new FormControl(this.editData?.dateEntree,Validators.required),
          dateSortie : new FormControl(this.editData?.dateSortie,Validators.required),
          quantiteSortie : new FormControl(this.editData?.quantiteSortie,Validators.required),
          batiment: new FormControl(this.editData?.batiment,Validators.required),
          bande: new FormControl(this.editData?.bande,Validators.required),
          epuisee : new FormControl(this.editData?.epuisee,Validators.required),
      });
      }
  
      this.readAllBatiment()
      this.readAllBande()
    }


    updateNutrition(){
      Swal.fire({
        title:"Modifier Nutrition",
        icon:'warning',
        text:'Etes vous sûr de vouloir modifier?',
        confirmButtonText:'Confirmer',
        showConfirmButton:true,
        cancelButtonText:'Annuler',
        showCancelButton:true,
        reverseButtons: true
      }).then((result)=>{
        if(result.value){
      const fiche = this.form.getRawValue();
      
      fiche.batiment=fiche.batiment.id
      fiche.bande=fiche.bande.id
      console.log("fiche {}", fiche)
  
      this.nutritionService.updateNutrition(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La Nutrition a été a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier la nutrition '+this.editData?.designation
          });
        });
      }else{
        Swal.fire(
                    'Annulation',
                    "Annulation Modification",
                    'error'
                  )
        }
            
  })
    
  }
  
    clear(value: string) {
      this.form.get(value).setValue('')
    }





    readAllBatiment(){
      let subscribe=this.batimentService.getAllBatiments(this.headers).subscribe(data=>{
  
        this.batiments=data
  
        console.log("liste des batiments ================{}", data)
          
              this.filterOptions = this.form.controls['batiment'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.designation;
                      return name ? this._filterBatiment(name as string) : this.batiments.slice();
                  }),
              );
        })
    }
    
    getBatiment(element: Batiment) {
        console.log("element ======", element)
        return element ? element?.designation + "" + '' : "";
    }
    
    private _filterBatiment(name: string) {
      const filterValue = name.toLowerCase();
      return this.batiments.filter(option => (option.designation).toLowerCase().indexOf(filterValue)===0);
    }


    readAllBande(){
      let subscribe=this.bandeService.getAllBandes(this.headers).subscribe(data=>{
  
        this.bandes=data
  
        console.log("liste des bandes ================{}", data)
          
              this.filterOptionsBande = this.form.controls['bande'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.designation;
                      return name ? this._filterBande(name as string) : this.bandes.slice();
                  }),
              );
        })
    }
    
    getBande(element: Bande) {
        console.log("element ======", element)
        return element ? element?.designation + "" + '' : "";
    }
    
    private _filterBande(name: string) {
      const filterValue = name.toLowerCase();
      return this.bandes.filter(option => (option.designation).toLowerCase().indexOf(filterValue)===0);
    }

}
