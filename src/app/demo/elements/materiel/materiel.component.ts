import { Component, OnInit } from '@angular/core';
import { MaterielService } from '../../services/materiel.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Materiel } from '../../models/materiel.model';
import {Batiment} from "../../models/batiment.model";
import {Fournisseur} from "../../models/fournisseur.model";
import {BatimentService} from "../../services/batiment.service";
import {FournisseurService} from "../../services/fournisseur.service";

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit{

  materiels : Materiel[];
  batiments: Batiment[] = [];
  fournisseurs : Fournisseur[] = [];

  materiel : Materiel = {
    batiment: undefined,
    designation: "",
    fournisseur: undefined,
    id: 0, quantite: 0

  };

  constructor(private materielService: MaterielService,
              private authService: AuthService,
              private batimentService : BatimentService,
              private fournisseurService : FournisseurService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des mateiaux.'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.materielService.getAllMateriels(headers).subscribe(
      (data: Materiel[]) => {
        this.materiels = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des matériaux.'
        });

        console.error('Erreur lors de la récupération des matériaux:', error);
      }
    );

    this.loadBatimentList()
    this.loadFournisseurList()


    }


//Ajout
  addMateriel(){
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
    this.materielService.addMteriel(this.materiel, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Matériel ajouté avec succcés'
        });

        console.log('Matériel enregistré:', response);
        this.loadMaterielList();

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n/'êtes pas autorisé à enregistrer un Matériel ."
        });

        console.error('Erreur lors de l\'enregistrement d\' un Matériel:', error);
      }
    );

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
  // Méthode pour récupérer la liste des fournisseurs
  loadFournisseurList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.fournisseurService.getAllFournisseurs(headers).subscribe(
        (data: Fournisseur[]) => {
          this.fournisseurs = data;
        },
        (error) => {
        }
      );
    }
  }
  loadMaterielList() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };

      this.materielService.getAllMateriels(headers).subscribe(
        (data: Materiel[]) => {
          this.materiels = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des Matériel:', error);
        }
      );
    }
  }
}
