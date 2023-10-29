import { Component, OnInit } from '@angular/core';
import { MaterielService } from '../../services/materiel.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Materiel } from '../../models/materiel.model';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent implements OnInit{

  materiels : Materiel[];

  constructor(private materielService: MaterielService, private authService: AuthService) {}

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


    }



}
