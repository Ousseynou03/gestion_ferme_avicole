import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Bande } from 'src/app/demo/models/bande.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { DepenseService } from 'src/app/demo/services/depense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-depense',
  templateUrl: './edit-depense.component.html',
  styleUrls: ['./edit-depense.component.scss']
})
export class EditDepenseComponent {

  libelleError: string="";

  bandes: Bande[]

  filterOptions: Observable<Bande[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private bandeService: BandeService,
  private _changeDetectorRef: ChangeDetectorRef,
  private depenseService: DepenseService,
  public matDialogRef: MatDialogRef<EditDepenseComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}



     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          dateDepense: new FormControl(this.editData?.dateDepense,Validators.required),
          categorie: new FormControl(this.editData?.categorie,Validators.required),
          quantite: new FormControl(this.editData?.quantite,Validators.required),
          prixUnitaire: new FormControl(this.editData?.prixUnitaire,Validators.required),
          montant: new FormControl(this.editData?.montant,Validators.required),
          description: new FormControl(this.editData?.description,Validators.required),
          bande: new FormControl(this.editData?.bande,Validators.required),
      });
      }
  
      this.readAllBande()
    }

    updateDepense(){
      Swal.fire({
        title:"Modifier Depense",
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
  
      this.depenseService.updateDepense(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La Depense a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier la bande '+this.editData?.designation
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
