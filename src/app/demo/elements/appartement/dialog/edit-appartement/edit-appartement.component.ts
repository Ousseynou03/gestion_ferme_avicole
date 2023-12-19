import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appartement } from 'src/app/demo/models/appartement.model';
import { AppartementService } from 'src/app/demo/services/appartement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-appartement',
  templateUrl: './edit-appartement.component.html',
  styleUrls: ['./edit-appartement.component.scss']
})
export class EditAppartementComponent {

  libelleError: string="";

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private appartementService: AppartementService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditAppartementComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          nom: new FormControl(this.editData?.nom,Validators.required),
          niveau: new FormControl(this.editData?.niveau,Validators.required),
          adresse : new FormControl(this.editData?.adresse,Validators.required),
          nombrePieces : new FormControl(this.editData?.nombrePieces,Validators.required),
          surface : new FormControl(this.editData?.surface,Validators.required),
          loyerMensuel : new FormControl(this.editData?.loyerMensuel,Validators.required),
      });
      }
    }


    updateAppartement(){
      Swal.fire({
        title:"Modifier Appartement",
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
  
      this.appartementService.updateAppartement(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'Appartement a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier l\'Appartement '+this.editData?.designation
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
