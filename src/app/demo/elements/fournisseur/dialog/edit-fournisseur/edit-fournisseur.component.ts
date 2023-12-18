import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FournisseurService } from 'src/app/demo/services/fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.scss']
})
export class EditFournisseurComponent {

  libelleError: string="";

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private fournisseurService: FournisseurService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditFournisseurComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}


     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          type: new FormControl(this.editData?.type,Validators.required),
          nom: new FormControl(this.editData?.nom,Validators.required),
          numTel : new FormControl(this.editData?.numTel,Validators.required),
          email : new FormControl(this.editData?.email,Validators.required),
      });
      }
    }


    updateFournisseur(){
      Swal.fire({
        title:"Modifier Fournisseur",
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
  
      this.fournisseurService.updateFournisseur(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le Fournisseur a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier le fournisseur '+this.editData?.designation
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
