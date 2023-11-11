import { Component, OnInit } from '@angular/core';
import { Bande } from '../../models/bande.model';
import { BandeService } from '../../services/bande.service';
import { AuthService } from '../../services/auth.service';
import { BatimentService } from '../../services/batiment.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-bande',
  templateUrl: './bande.component.html',
  styleUrls: ['./bande.component.scss']
})
export class BandeComponent implements OnInit {

  bandes: Bande[] = [];
  batiments: any;

  bande : UntypedFormGroup

  filterOptions : Observable<string[]>

  bat : Batiment;


  






  constructor(private bandeService: BandeService,
    private authService: AuthService,
    private batimentService : BatimentService,
    private fb : FormBuilder) {}

    ngOnInit() {


   this.bande = this.fb.group( {
    id: [],
    code: new FormControl(null,Validators.required),
    designation: new FormControl(null,Validators.required),
    dateDebut: new FormControl(null,Validators.required),
    dateFin: new FormControl(null,Validators.required),
    effectifdepart: new FormControl(null),
    batiment: new FormControl(null,Validators.required),
  });

  this.readAllBatiment();

      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour récupérer la liste des bandes.'
        });
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      this.bandeService.getAllBandes(headers).subscribe(
        (data: Bande[]) => {
          this.bandes = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: 'Impossible de récupérer la liste des bandes.'
          });

          console.error('Erreur lors de la récupération des bandes:', error);
        }
      );

      // Chargez la liste des bâtiments
      this.loadBatimentList();
    }

    // Méthode pour récupérer la liste des bâtiments
    loadBatimentList() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };

        this.batimentService.getAllBatiments(headers).subscribe(
          (data: Batiment[]) => {
            this.batiments = data;
          },
          (error) => {
          }
        );
      }
    }


/*
      //Ajout
  addBande(){
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté...'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.bandeService.addBande(this.bande, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Bande ajouté avec succcés'
        });

        console.log('Bande enregistré:', response);
        this.loadBandeList();

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n/'êtes pas autorisé à enregistrer une Bande ."
        });

        console.error('Erreur lors de l\'enregistrement d\' une Bande:', error);
      }
    );

  }

  // Méthode pour charger la liste des bandes
  loadBandeList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.bandeService.getAllBandes(headers).subscribe(
        (data: Bande[]) => {
          this.bandes = data;
        },
        (error) => {
          // Gestion de l'erreur
        }
      );
    }
  }
  */


  addBande() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // Swal...
      return;
    }
    const bande = this.bande.getRawValue()
  
    const headers = { Authorization: `Bearer ${token}` };
    console.log("bande =====================", bande);
    
    
  
    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.bandeService.addBande(bande, headers).subscribe(
      (response) => {
        // Swal...
        console.log('Bande enregistrée :', response);
        this.loadBandeList();
      },
      (error) => {
        // Swal...
        console.error('Erreur lors de l\'enregistrement d\'une bande :', error);
      }
    );
  }
  
  
  
    // Méthode pour mettre à jour la liste des bandes (facultatif)
    loadBandeList() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.bandeService.getAllBandes(headers).subscribe(
          (data: Bande[]) => {
            this.bandes = data;
          },
          (error) => {
            // Swal...
            console.error('Erreur lors de la récupération des bandes:', error);
          }
        );
      }
    }


    readAllBatiment(){
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
      let subscribe=this.batimentService.getAllBatiments(headers).subscribe(data=>{
      
      this.batiments=data
      
      console.log("Batiment ================{}", this.batiments)
      this.filterOptions = this.bande.controls['batiment'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
      const name = typeof value === 'string' ? value : value?.code || value?.designation;
      
      return name ? this._filterBatiment(name as string) : this.batiments.slice();
      }),
      );
      })
      }
    }
      
      getBatiment(element: Batiment) {
      return element ? element?.code + element?.designation : "";
      }
      
      private _filterBatiment(name: string) {
      const filterValue = name.toLowerCase();
      return this.batiments.filter(option => (option.code + option.designation).toLowerCase().indexOf(filterValue)===0);
      }



      




}
