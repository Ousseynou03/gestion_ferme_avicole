import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/demo/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{

  libelleError: string="";

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private clientService: ClientService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditClientComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}



     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          nom: new FormControl(this.editData?.nom,Validators.required),
          ville: new FormControl(this.editData?.ville,Validators.required),
          numTel : new FormControl(this.editData?.numTel,Validators.required),
      });
      }
    }



    updateClient(){
      Swal.fire({
        title:"Modifier Client",
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
      
   
      console.log("fiche {}", fiche)
  
      this.clientService.updateClient(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le Client a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier le client '+this.editData?.designation
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
