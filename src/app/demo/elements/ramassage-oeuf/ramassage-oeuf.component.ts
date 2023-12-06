import { Component, OnInit } from '@angular/core';
import { RamassageOeufService } from '../../services/ramassage-oeuf.service';
import { BandeService } from '../../services/bande.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Ramassage } from '../../models/ramassage.model';
import { Bande } from '../../models/bande.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ramassage-oeuf',
  templateUrl: './ramassage-oeuf.component.html',
  styleUrls: ['./ramassage-oeuf.component.scss']
})
export class RamassageOeufComponent implements OnInit{


  ramassages: Ramassage[];
  bandes: Bande[];


  ramassageForm = this.fb.group({
    observation: [null, Validators.required],
    quantite: ['', Validators.required],
    nbrOeufCasse : [null, Validators.required],
    nbrOeufPerdu : [null, Validators.required],
    dateRamassage : ['', Validators.required],
    bande: [null, Validators.required],
  });

  constructor(
    private ramassageService : RamassageOeufService,
    private bandeService: BandeService,
    private fb: FormBuilder,
    public authService : AuthService
  ) {}


  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des ramassages.'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    this.loadBandeList(headers);
    this.loadRamassageList(headers);
  }


  loadRamassageList(headers: any) {
    this.ramassageService.getAllRamassages(headers).subscribe(
      (data: Ramassage[]) => {
        this.ramassages = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des ramassages.'
        });
  
        console.error('Erreur lors de la récupération des ramassages :', error);
      }
    );
  }


  loadBandeList(headers: any) {
    this.bandeService.getAllBandes(headers).subscribe(bandes => {
      this.bandes = bandes;
    });
  }


  addRamassage() {
    if (this.ramassageForm.valid) {
      const ramassage: Ramassage = {
        id: null,
        observation: this.ramassageForm.value.observation,
        quantite: this.ramassageForm.value.quantite,
        nbrOeufCasse: this.ramassageForm.value.nbrOeufCasse,
        nbrOeufPerdu : this.ramassageForm.value.nbrOeufPerdu,
        dateRamassage : this.ramassageForm.value.dateRamassage,
        bande: this.ramassageForm.value.bande,

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
  
      this.ramassageService.addRamassageOeuf(ramassage, headers).subscribe(
        (createdRamassage) => {
          console.log('Ramassage created successfully:', createdRamassage);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Le Ramassage a été ajoutée avec succès.'
          });
          this.ramassageForm.reset();
          this.loadRamassageList(headers);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du ramassage:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du ramassage.'
          });
        }
      );
    }
  }




    // Suppression
    deleteRamassage(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer ce ramassage ?',
        text: 'Le Ramassage sera définitivement supprimé!',
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
    
          this.ramassageService.deleteRamassage(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'Le Ramassage a été supprimé avec succès.',
                icon: 'success'
              });
              this.ramassageService.getAllRamassages(headers).subscribe(updatedRamassages => {
                this.ramassages = updatedRamassages;
              });
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer ce ramassage.',
                icon: 'error'
              });
            }
          );
        }
      });
    }

}
