import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Validators, UntypedFormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, takeUntil, startWith, map } from 'rxjs';
import { Batiment } from 'src/app/demo/models/batiment.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { BatimentService } from 'src/app/demo/services/batiment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  libelleError: string="";

  batiments: Batiment[]

  filterOptions: Observable<Batiment[]>;

  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private batimentService: BatimentService,
  private _changeDetectorRef: ChangeDetectorRef,
  private bandeService: BandeService,
  public matDialogRef: MatDialogRef<EditComponent>,
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
        dateDebut: new FormControl(this.editData?.dateDebut,Validators.required),
        dateFin: new FormControl(this.editData?.dateFin,Validators.required),
        effectifdepart: new FormControl(this.editData?.effectifdepart,Validators.required),
        batiment: new FormControl(this.editData?.batiment,Validators.required),
    });
    }

    this.readAllBatiment()
  }

  updateBande(){
    Swal.fire({
      title:"Modifier Bande",
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
    console.log("fiche {}", fiche)

    this.bandeService.updateBande(this.editData?.id, fiche, this.headers).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'La bande a été modifiée avec succès.'
      });
      this.matDialogRef.close(true)
      },
      (error)=> {
        Swal.fire({
          icon: 'error',
          title: "Erreur",
          text: 'Impossible de modifier la bande '+this.editData?.designation
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
}