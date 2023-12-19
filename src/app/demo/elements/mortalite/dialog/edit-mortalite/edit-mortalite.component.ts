import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Bande } from 'src/app/demo/models/bande.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { MortaliteService } from 'src/app/demo/services/mortalite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mortalite',
  templateUrl: './edit-mortalite.component.html',
  styleUrls: ['./edit-mortalite.component.scss']
})
export class EditMortaliteComponent {

  libelleError: string="";

  bandes: Bande[]

  filterOptions: Observable<Bande[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private mortaliteService: MortaliteService,
  private _changeDetectorRef: ChangeDetectorRef,
  private bandeService: BandeService,
  public matDialogRef: MatDialogRef<EditMortaliteComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}


     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          effectif: new FormControl(this.editData?.effectif,Validators.required),
          dateMortalite: new FormControl(this.editData?.dateMortalite,Validators.required),
          description: new FormControl(this.editData?.description,Validators.required),
          bande: new FormControl(this.editData?.bande,Validators.required),
      });
      }
  
      this.readAllBande()
    }

    updateMortalite(){
      Swal.fire({
        title:"Modifier Mortalite",
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
      
      fiche.bande=fiche.bande.id
      console.log("fiche {}", fiche)
  
      this.mortaliteService.updateMortalite(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La Mortalité a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier la mortalité '+this.editData?.designation
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


    readAllBande(){
      let subscribe=this.bandeService.getAllBandes(this.headers).subscribe(data=>{
  
        this.bandes=data
  
        console.log("liste des bandes ================{}", data)
          
              this.filterOptions = this.form.controls['bande'].valueChanges.pipe(
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
