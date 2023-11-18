import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../../services/depense.service';
import { BandeService } from '../../services/bande.service';
import Swal from 'sweetalert2';
import { Bande } from '../../models/bande.model';
import { Depense } from '../../models/depense.model';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent implements OnInit{


  depenses : Depense[];

  constructor(private depenseService : DepenseService,
    private bandeService : BandeService){}


    ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour récupérer la liste des dépenses.'
        });
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      this.loadDepenseList(headers);
    }



    loadDepenseList(headers: any) {
      this.depenseService.getAllDepenses(headers).subscribe(
        (data: Depense[]) => {
          this.depenses = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: 'Impossible de récupérer la liste des dépenses.'
          });
    
          console.error('Erreur lors de la récupération des dépenses :', error);
        }
      );
    }

    
}
