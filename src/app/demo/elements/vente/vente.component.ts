// vente.component.ts

import { Component, OnInit } from '@angular/core';
import { Vente } from '../../models/vente.model';
import { VenteService } from '../../services/vente.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  ventes: Vente[];
  totalMontant: number = 0;

  constructor(private venteService: VenteService, public authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des ventes.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadVenteList(headers);
  }

  loadVenteList(headers: any) {
    this.venteService.getAllVentes(headers).subscribe(
      (data: Vente[]) => {
        this.ventes = data;
        this.calculateTotalMontant();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des ventes.'
        });

        console.error('Erreur lors de la récupération des ventes :', error);
      }
    );
  }

  private calculateTotalMontant(): void {
    this.totalMontant = this.ventes.reduce((total, vente) => total + vente.montant, 0);
  }

  
}
