import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BatimentService } from 'src/app/demo/services/batiment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-batiment',
  templateUrl: './edit-batiment.component.html',
  styleUrls: ['./edit-batiment.component.scss']
})
export class EditBatimentComponent implements OnInit{

  libelleError: string="";

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private batimentService: BatimentService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditBatimentComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          code: new FormControl(this.editData?.code,Validators.required),
          designation: new FormControl(this.editData?.designation,Validators.required),
          capacite : new FormControl(this.editData?.capacite,Validators.required),
          dimension : new FormControl(this.editData?.dimension,Validators.required),
      });
      }
    }


    updateBatiment(){
      Swal.fire({
        title:"Modifier Batiment",
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
  
      this.batimentService.updateBatiment(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le Batiment a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier le batiment '+this.editData?.designation
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
