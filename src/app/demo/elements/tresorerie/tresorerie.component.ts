import { Component, OnInit } from '@angular/core';
import { TresorerieService } from '../../services/tresorerie.service';
import Swal from 'sweetalert2';
import { Tresorerie } from '../../models/tresorerie.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tresorerie',
  templateUrl: './tresorerie.component.html',
  styleUrls: ['./tresorerie.component.scss']
})
export class TresorerieComponent implements OnInit{


  tresoreries : Tresorerie[];

  constructor(private tresoreriService : TresorerieService, public authService : AuthService){}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des trésoreries.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadTresorerieList(headers);
  }

  loadTresorerieList(headers: any) {
    this.tresoreriService.getAllTresoreries(headers).subscribe(
      (data: Tresorerie[]) => {
        this.tresoreries = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des trésoreries.'
        });
        console.error('Erreur lors de la récupération des trésoreries :', error);
      }
    );
  }





    // Suppression
    deleteTresorerie(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer cette trésorerie ?',
        text: 'La trésorerie sera définitivement supprimée!',
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
    
          this.tresoreriService.deleteTresorerie(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'La trésorerie a été supprimé avec succès.',
                icon: 'success'
              });
              this.tresoreriService.getAllTresoreries(headers).subscribe(updatedTresoreries => {
                this.tresoreries = updatedTresoreries;
              });
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer cette trésorerie.',
                icon: 'error'
              });
            }
          );
        }
      });
    }

}
