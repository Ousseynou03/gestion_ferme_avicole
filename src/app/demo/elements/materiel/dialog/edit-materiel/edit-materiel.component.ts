import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Batiment } from 'src/app/demo/models/batiment.model';
import { Fournisseur } from 'src/app/demo/models/fournisseur.model';
import { BatimentService } from 'src/app/demo/services/batiment.service';
import { FournisseurService } from 'src/app/demo/services/fournisseur.service';
import { MaterielService } from 'src/app/demo/services/materiel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-materiel',
  templateUrl: './edit-materiel.component.html',
  styleUrls: ['./edit-materiel.component.scss']
})
export class EditMaterielComponent {

  libelleError: string="";

  batiments: Batiment[]
  fournisseurs : Fournisseur[]

  filterOptions: Observable<Batiment[]>;
  filterOptionsFournisseur: Observable<Fournisseur[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private materielService : MaterielService,
  private batimentService: BatimentService,
  private fournisseurService : FournisseurService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<EditMaterielComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}


     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          designation: new FormControl(this.editData?.designation,Validators.required),
          quantite: new FormControl(this.editData?.quantite,Validators.required),
          batiment: new FormControl(this.editData?.batiment,Validators.required),
          fournisseur: new FormControl(this.editData?.fournisseur,Validators.required),
      });
      }
  
      this.readAllBatiment()
      this.readAllFournisseur()
    }

    updateMateriel(){
      Swal.fire({
        title:"Modifier Materiel",
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
      
      fiche.batiment=fiche.batiment.id
      fiche.fournisseur=fiche.fournisseur.id
      console.log("fiche {}", fiche)
  
      this.materielService.updateMateiel(this.editData?.id, fiche, this.headers).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Le Materiel a été modifié avec succès.'
        });
        this.matDialogRef.close(true)
        },
        (error)=> {
          Swal.fire({
            icon: 'error',
            title: "Erreur",
            text: 'Impossible de modifier le materiel '+this.editData?.designation
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



    readAllBatiment(){
      let subscribe=this.batimentService.getAllBatiments(this.headers).subscribe(data=>{
  
        this.batiments=data
  
        console.log("liste des batiments ================{}", data)
          
              this.filterOptions = this.form.controls['batiment'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.designation;
                      return name ? this._filterBatiment(name as string) : this.batiments.slice();
                  }),
              );
        })
    }
    
    getBatiment(element: Batiment) {
        console.log("element ======", element)
        return element ? element?.designation + "" + '' : "";
    }
    
    private _filterBatiment(name: string) {
      const filterValue = name.toLowerCase();
      return this.batiments.filter(option => (option.designation).toLowerCase().indexOf(filterValue)===0);
    }


    readAllFournisseur(){
      let subscribe=this.fournisseurService.getAllFournisseurs(this.headers).subscribe(data=>{
  
        this.fournisseurs=data
  
        console.log("liste des fournisseur ================{}", data)
          
              this.filterOptionsFournisseur = this.form.controls['fournisseur'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.nom;
                      return name ? this._filterFournisseur(name as string) : this.fournisseurs.slice();
                  }),
              );
        })
    }
    
    getFournisseur(element: Fournisseur) {
        console.log("element ======", element)
        return element ? element?.nom + "" + '' : "";
    }
    
    private _filterFournisseur(name: string) {
      const filterValue = name.toLowerCase();
      return this.fournisseurs.filter(option => (option.nom).toLowerCase().indexOf(filterValue)===0);
    }



}


