import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Locataire } from 'src/app/demo/models/locataire.model';
import { ContratLocationService } from 'src/app/demo/services/contrat-location.service';
import { LocataireService } from 'src/app/demo/services/locataire.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contrat-location',
  templateUrl: './edit-contrat-location.component.html',
  styleUrls: ['./edit-contrat-location.component.scss']
})
export class EditContratLocationComponent {


  libelleError: string="";

  locataires: Locataire[]

  filterOptions: Observable<Locataire[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private locataireService: LocataireService,
  private _changeDetectorRef: ChangeDetectorRef,
  private contratLocationService: ContratLocationService,
  public matDialogRef: MatDialogRef<EditContratLocationComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

  ngOnInit(): void {

    if (this.editData) {
      console.log("console edit data ================== {}",this.editData)

      this.form = this._formBuilder.group({
        id:new FormControl(this.editData?.id),
        dateDebut: new FormControl(this.editData?.dateDebut,Validators.required),
        dateFin: new FormControl(this.editData?.dateFin,Validators.required),
        locataire: new FormControl(this.editData?.locataire,Validators.required),
    });
    }

    this.readAllLocataire()
  }

  updateContratLocation(){
    Swal.fire({
      title:"Modifier Contrat",
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
    
    fiche.locataire=fiche.locataire.id
    console.log("fiche {}", fiche)

    this.contratLocationService.updateContratLocation(this.editData?.id, fiche, this.headers).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le Contrat été modifié avec succès.'
      });
      this.matDialogRef.close(true)
      },
      (error)=> {
        Swal.fire({
          icon: 'error',
          title: "Erreur",
          text: 'Impossible de modifier le Contrat '+this.editData?.designation
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


  readAllLocataire(){
    let subscribe=this.locataireService.getAllLocataires(this.headers).subscribe(data=>{

      this.locataires=data

      console.log("liste des locataires ================{}", data)
        
            this.filterOptions = this.form.controls['locataire'].valueChanges.pipe(
                startWith(''),
                map((value: any) => {
                    const name = typeof value === 'string' ? value : value?.nom;
                    return name ? this._filterLocataire(name as string) : this.locataires.slice();
                }),
            );
      })
  }
  
  getLocataire(element: Locataire) {
      console.log("element ======", element)
      return element ? element?.nom + "" + '' : "";
  }
  
  private _filterLocataire(name: string) {
    const filterValue = name.toLowerCase();
    return this.locataires.filter(option => (option.nom).toLowerCase().indexOf(filterValue)===0);
  }

}
