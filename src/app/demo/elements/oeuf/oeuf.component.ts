import { Component, OnInit } from '@angular/core';
import { OeufService } from '../../services/oeuf.service';
import { AuthService } from '../../services/auth.service';
import { BatimentService } from '../../services/batiment.service';
import { Oeuf } from '../../models/oeuf.model';
import { Batiment } from '../../models/batiment.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oeuf',
  templateUrl: './oeuf.component.html',
  styleUrls: ['./oeuf.component.scss']
})
export class OeufComponent implements OnInit{

  oeufs : Oeuf[];
  batiments: Batiment[];



  oeufForm = this.fb.group({
    designation: ['', Validators.required],
    quantite: ['', Validators.required],
    nbrPlateau : ['', Validators.required],
    batiment: [null, Validators.required],
  });


  constructor(private oeufService : OeufService,
    public authService: AuthService,
    private batimentService : BatimentService,
    private fb : FormBuilder){}



    ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour récupérer la liste des stocks d\'oeufs.'
        });
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      this.oeufService.getAllOeufs(headers).subscribe(
        (data: Oeuf[]) => {
          this.oeufs = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: 'Impossible de récupérer la liste de stock d\'oeuf.'
          });
  
          console.error('Erreur lors de la récupération de stock d\'oeuf:', error);
        }
      );
  
      this.loadBatimentList(headers);
    }


    addOeuf() {
      if (this.oeufForm.valid) {
        const oeuf: Oeuf = {
          id: null,
          designation: this.oeufForm.value.designation,
          nbrPlateau : this.oeufForm.value.nbrPlateau,
          quantite: this.oeufForm.value.quantite,
          batiment: this.oeufForm.value.batiment,
        };

    
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
    
        this.oeufService.addOeuf(oeuf, headers).subscribe(
          (createdOeuf) => {
            console.log('Materiel created successfully:', createdOeuf);
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Le Stock a été ajouté avec succès.'
            });
            this.loadOeufList(headers);
            this.oeufForm.reset();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du stock d\'oeuf:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l\'ajout du stock d\'oeuf.'
            });
          }
        );
      }
    }


      // Méthode pour récupérer la liste des bâtiments
  loadBatimentList(headers: any) {
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

  loadOeufList(headers: any) {
    this.oeufService.getAllOeufs(headers).subscribe(
      (data: Oeuf[]) => {
        this.oeufs = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste de stock d\'oeuf.'
        });
  
        console.error('Erreur lors de la récupération de stock d\'oeuf:', error);
      }
    );
  }



      // Suppression
      deleteOeuf(id: number) {
        Swal.fire({
          title: 'Voulez-vous vraiment supprimer ce stock ?',
          text: 'Le stock sera définitivement supprimé!',
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
      
            this.oeufService.deleteOeuf(id, headers).subscribe(
              () => {
                Swal.fire({
                  title: 'Supprimé!',
                  text: 'Le stock d\'oeuf a été supprimé avec succès.',
                  icon: 'success'
                });
                this.oeufService.getAllOeufs(headers).subscribe(updatedOeufs => {
                  this.oeufs = updatedOeufs;
                });
              },
              (error) => {
                Swal.fire({
                  title: 'Oups!',
                  text: 'Impossible de supprimer ce stock.',
                  icon: 'error'
                });
              }
            );
          }
        });
      }



}
