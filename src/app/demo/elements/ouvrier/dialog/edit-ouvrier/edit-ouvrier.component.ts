import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OuvrierService } from 'src/app/demo/services/ouvrier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-ouvrier',
  templateUrl: './edit-ouvrier.component.html',
  styleUrls: ['./edit-ouvrier.component.scss']
})
export class EditOuvrierComponent {

  libelleError: string="";

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private ouvrierService: OuvrierService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditOuvrierComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}
     

     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          fonction: new FormControl(this.editData?.fonction,Validators.required),
          nom: new FormControl(this.editData?.nom,Validators.required),
          numTel : new FormControl(this.editData?.numTel,Validators.required),
          ville : new FormControl(this.editData?.ville,Validators.required),
          salaire : new FormControl(this.editData?.salaire,Validators.required),
      });
      }
    }


    updateOuvrier(){
      Swal.fire({
        title:"Modifier Ouvrier",
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
      
     // fiche.batiment=fiche.batiment.id
      console.log("fiche {}", fiche)
  
      this.ouvrierService.updateOuvrier(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'Ouvrier a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier l\'ouvrier '+this.editData?.designation
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

}
