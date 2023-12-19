import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Appartement } from 'src/app/demo/models/appartement.model';
import { AppartementService } from 'src/app/demo/services/appartement.service';
import { LocataireService } from 'src/app/demo/services/locataire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-locataire',
  templateUrl: './edit-locataire.component.html',
  styleUrls: ['./edit-locataire.component.scss']
})
export class EditLocataireComponent {

  libelleError: string="";

  appartements: Appartement[]

  filterOptions: Observable<Appartement[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private appartementService: AppartementService,
  private _changeDetectorRef: ChangeDetectorRef,
  private locataireService: LocataireService,
  public matDialogRef: MatDialogRef<EditLocataireComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

  ngOnInit(): void {

    if (this.editData) {
      console.log("console edit data ================== {}",this.editData)

      this.form = this._formBuilder.group({
        id:new FormControl(this.editData?.id),
        nom: new FormControl(this.editData?.nom,Validators.required),
        prenom: new FormControl(this.editData?.prenom,Validators.required),
        adresse: new FormControl(this.editData?.adresse,Validators.required),
        email: new FormControl(this.editData?.email,Validators.required),
        actif: new FormControl(this.editData?.actif,Validators.required),
        appartement: new FormControl(this.editData?.appartement,Validators.required),
    });
    }

    this.readAllAppartement()
  }

  updateLocataire(){
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
    
    fiche.appartement=fiche.appartement.id
    console.log("fiche {}", fiche)

    this.locataireService.updateLocataire(this.editData?.id, fiche, this.headers).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le Loctaire été modifié avec succès.'
      });
      this.matDialogRef.close(true)
      },
      (error)=> {
        Swal.fire({
          icon: 'error',
          title: "Erreur",
          text: 'Impossible de modifier le Loctaire '+this.editData?.designation
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


  readAllAppartement(){
    let subscribe=this.appartementService.getAllAppartements(this.headers).subscribe(data=>{

      this.appartements=data

      console.log("liste des appartements ================{}", data)
        
            this.filterOptions = this.form.controls['appartement'].valueChanges.pipe(
                startWith(''),
                map((value: any) => {
                    const name = typeof value === 'string' ? value : value?.nom;
                    return name ? this._filterAppartement(name as string) : this.appartements.slice();
                }),
            );
      })
  }
  
  getAppartement(element: Appartement) {
      console.log("element ======", element)
      return element ? element?.nom + "" + '' : "";
  }
  
  private _filterAppartement(name: string) {
    const filterValue = name.toLowerCase();
    return this.appartements.filter(option => (option.nom).toLowerCase().indexOf(filterValue)===0);
  }

}
