import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Locataire } from 'src/app/demo/models/locataire.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { LocataireService } from 'src/app/demo/services/locataire.service';
import { PaiementService } from 'src/app/demo/services/paiement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-paiement',
  templateUrl: './edit-paiement.component.html',
  styleUrls: ['./edit-paiement.component.scss']
})
export class EditPaiementComponent {

  libelleError: string="";

  locataires: Locataire[]

  filterOptions: Observable<Locataire[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private locataireService: LocataireService,
  private _changeDetectorRef: ChangeDetectorRef,
  private paiementService: PaiementService,
  public matDialogRef: MatDialogRef<EditPaiementComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}

  ngOnInit(): void {

    if (this.editData) {
      console.log("console edit data ================== {}",this.editData)

      this.form = this._formBuilder.group({
        id:new FormControl(this.editData?.id),
        montant: new FormControl(this.editData?.montant,Validators.required),
        datePaiement: new FormControl(this.editData?.datePaiement,Validators.required),
        locataire: new FormControl(this.editData?.locataire,Validators.required),
    });
    }

    this.readAllLocataire()
  }

  updatePaiement(){
    Swal.fire({
      title:"Modifier Paiement",
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

    this.paiementService.updatePaiement(this.editData?.id, fiche, this.headers).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le Paiement été modifié avec succès.'
      });
      this.matDialogRef.close(true)
      },
      (error)=> {
        Swal.fire({
          icon: 'error',
          title: "Erreur",
          text: 'Impossible de modifier le paiement '+this.editData?.designation
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
