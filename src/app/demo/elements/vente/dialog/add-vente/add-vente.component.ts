import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Bande } from 'src/app/demo/models/bande.model';
import { Client } from 'src/app/demo/models/client.model';
import { Tresorerie } from 'src/app/demo/models/tresorerie.model';
import { BandeService } from 'src/app/demo/services/bande.service';
import { ClientService } from 'src/app/demo/services/client.service';
import { TresorerieService } from 'src/app/demo/services/tresorerie.service';
import { VenteService } from 'src/app/demo/services/vente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vente',
  templateUrl: './add-vente.component.html',
  styleUrls: ['./add-vente.component.scss']
})
export class AddVenteComponent {

  libelleError: string="";

  bandes: Bande[]
  clients : Client[]
  tresoreries : Tresorerie[]

  filterOptions: Observable<Bande[]>;
  filterOptionsClient: Observable<Client[]>;
  filterOptionsTresorerie: Observable<Tresorerie[]>;


  form: FormGroup

  headers: any


  constructor(@Inject(MAT_DIALOG_DATA) public editData : any,
  private _formBuilder: UntypedFormBuilder,
  private venteService : VenteService,
  private bandeService: BandeService,
  private clientService : ClientService,
  private tresorerieService : TresorerieService,
  private _changeDetectorRef: ChangeDetectorRef,
  public matDialogRef: MatDialogRef<AddVenteComponent>,
  ) {
    const token = localStorage.getItem('token');

     this.headers = { Authorization: `Bearer ${token}` };}


     ngOnInit(): void {

      if (this.editData) {
        console.log("console edit data ================== {}",this.editData)
  
        this.form = this._formBuilder.group({
          id:new FormControl(this.editData?.id),
          quantite: new FormControl(this.editData?.quantite,Validators.required),
          prixUnitaire : new FormControl(this.editData?.prixUnitaire,Validators.required),
          montant : new FormControl(this.editData?.montant,Validators.required),
          description : new FormControl(this.editData?.description,Validators.required),
          client : new FormControl(this.editData?.client,Validators.required),
          bande: new FormControl(this.editData?.bande,Validators.required),
          tresorerie: new FormControl(this.editData?.tresorerie,Validators.required),
      });
      }
  
      this.readAllBande()
      this.readAllClient()
      this.readAllTresorerie()
    }

    addVente() {
      Swal.fire({
        title: "Ajouter Vente",
        icon: 'warning',
        text: 'Etes-vous sûr de vouloir ajouter?',
        confirmButtonText: 'Confirmer',
        showConfirmButton: true,
        cancelButtonText: 'Annuler',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          const venteData = this.form.getRawValue();
  
          // Transformez les données si nécessaire avant l'envoi
          venteData.bande = venteData.bande.id;
          venteData.client = venteData.client.id;
          venteData.tresorerie = venteData.tresorerie.id;
  
          this.venteService.addVente(venteData, this.headers).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'La Vente a été ajoutée avec succès.'
            });
            this.matDialogRef.close(true);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: "Erreur",
              text: 'Impossible d\'ajouter la Vente.'
            });
          });
        } else {
          Swal.fire(
            'Annulation',
            'Ajout annulé',
            'error'
          );
        }
      });
    }

    clear(value: string) {
      this.form.get(value).setValue('')
    }


    readAllBande(){
      let subscribe=this.bandeService.getAllBandes(this.headers).subscribe(data=>{
  
        this.bandes=data
  
        console.log("liste des bandes ================{}", data)
          
              this.filterOptions = this.form.controls['bande'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.designation;
                      return name ? this._filterBande(name as string) : this.bandes.slice();
                  }),
              );
        })
    }
    
    getBande(element: Bande) {
        console.log("element ======", element)
        return element ? element?.designation + "" + '' : "";
    }
    
    private _filterBande(name: string) {
      const filterValue = name.toLowerCase();
      return this.bandes.filter(option => (option.designation).toLowerCase().indexOf(filterValue)===0);
    }


    readAllClient(){
      let subscribe=this.clientService.getAllClients(this.headers).subscribe(data=>{
  
        this.clients=data
  
        console.log("liste des clients ================{}", data)
          
              this.filterOptionsClient = this.form.controls['client'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.nom;
                      return name ? this._filterClient(name as string) : this.clients.slice();
                  }),
              );
        })
    }
    
    getClient(element: Client) {
        console.log("element ======", element)
        return element ? element?.nom + "" + '' : "";
    }
    
    private _filterClient(name: string) {
      const filterValue = name.toLowerCase();
      return this.clients.filter(option => (option.nom).toLowerCase().indexOf(filterValue)===0);
    }



    readAllTresorerie(){
      let subscribe=this.tresorerieService.getAllTresoreries(this.headers).subscribe(data=>{
  
        this.tresoreries=data
  
        console.log("liste des tresoreries ================{}", data)
          
              this.filterOptionsTresorerie = this.form.controls['tresorerie'].valueChanges.pipe(
                  startWith(''),
                  map((value: any) => {
                      const name = typeof value === 'string' ? value : value?.type;
                      return name ? this._filterTresorerie(name as string) : this.tresoreries.slice();
                  }),
              );
        })
    }
    
    getTresorerie(element: Tresorerie) {
        console.log("element ======", element)
        return element ? element?.type + "" + '' : "";
    }
    
    private _filterTresorerie(name: string) {
      const filterValue = name.toLowerCase();
      return this.tresoreries.filter(option => (option.type).toLowerCase().indexOf(filterValue)===0);
    }

}
