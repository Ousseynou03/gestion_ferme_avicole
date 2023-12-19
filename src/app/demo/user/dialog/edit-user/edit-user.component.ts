import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/demo/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {


  libelleError: string="";

  form: FormGroup

  headers: any

  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private authService: AuthService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditUserComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          name: new FormControl(this.editData?.name,Validators.required),
          contactNumber: new FormControl(this.editData?.contactNumber,Validators.required),
          email : new FormControl(this.editData?.email,Validators.required),
          password : new FormControl(this.editData?.password,Validators.required),
          role : new FormControl(this.editData?.role,Validators.required),
          status : new FormControl(this.editData?.status,Validators.required),
      });
      }
    }


    updateUser(){
      Swal.fire({
        title:"Modifier Utilisateur",
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
  
      this.authService.updateUser(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'L\'utilisateur a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier l\'utilisateur '+this.editData?.designation
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
