import { Component, OnInit } from '@angular/core';
import { Nutrition } from '../../models/nutrition.model';
import { Bande } from '../../models/bande.model';
import { FormBuilder, Validators } from '@angular/forms';
import { BandeService } from '../../services/bande.service';
import { BatimentService } from '../../services/batiment.service';
import { AuthService } from '../../services/auth.service';
import { NutritionService } from '../../services/nutrition.service';
import Swal from 'sweetalert2';
import { Batiment } from '../../models/batiment.model';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit{

  nutritions: Nutrition[];
  batiments: Batiment[];


  NutritionForm = this.fb.group({
    designation: ['', Validators.required],
    quantite: [null, Validators.required],
    dateEntree: ['', Validators.required],
    dateSortie: ['', Validators.required],
    quantiteSortie: [null, Validators.required],
    batiment: [null,Validators.required]
  });

  constructor(
    private nutritionService : NutritionService,
    public authService: AuthService,
    private batimentService: BatimentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des nutritions.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadBatimentList(headers);
    this.loadNutritionList(headers);
  }

  loadNutritionList(headers: any) {
    this.nutritionService.getAllNutritions(headers).subscribe(
      (data: Nutrition[]) => {
        this.nutritions = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des nutritions.'
        });
  
        console.error('Erreur lors de la récupération des nutritions :', error);
      }
    );
  }
  

  loadBatimentList(headers: any) {
    this.batimentService.getAllBatiments(headers).subscribe(batiments => {
      this.batiments = batiments;
    });
  }

  

  addNutrition() {
    if (this.NutritionForm.valid) {
      const nutrition: Nutrition = {
        id: 0,
        designation: this.NutritionForm.value.designation,
        quantite: this.NutritionForm.value.quantite,
        dateEntree: this.NutritionForm.value.dateEntree,
        dateSortie: this.NutritionForm.value.dateSortie,
        quantiteSortie: this.NutritionForm.value.quantiteSortie,
        batiment: this.NutritionForm.value.batiment,
      };
  
      console.log('Valeur de batiment avant envoi:', this.NutritionForm.value.batiment);
  
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
  
      this.nutritionService.addNutrition(nutrition, headers).subscribe(
        (createdNutrition) => {
          console.log('Nutrition created successfully:', createdNutrition);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'La Nutrition a été ajoutée avec succès.'
          });
          this.loadNutritionList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la nutrition:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout de la nutrition.'
          });
        }
      );
    }
  }

  // Suppression
  deleteNutrition(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette Nutrition ?',
      text: 'La Nutrition sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        const token = localStorage.getItem('token');
  
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous devez être connecté en tant qu\'administrateur pour effectuer cette action.'
          });
          return;
        }
  
        const headers = { Authorization: `Bearer ${token}` };
  
        this.nutritionService.deleteNutrition(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'La Bande a été supprimé avec succès.',
              icon: 'success'
            });
            this.nutritionService.getAllNutritions(headers).subscribe(updatedNutritions => {
              this.nutritions = updatedNutritions;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cette nutrition.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

}
