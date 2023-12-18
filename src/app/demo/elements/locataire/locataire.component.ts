import { Component, OnInit, ViewChild } from '@angular/core';
import { Locataire } from '../../models/locataire.model';
import { Appartement } from '../../models/appartement.model';
import { LocataireService } from '../../services/locataire.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AppartementService } from '../../services/appartement.service';
import { SearchService } from '../../services/search.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-locataire',
  templateUrl: './locataire.component.html',
  styleUrls: ['./locataire.component.scss']
})
export class LocataireComponent implements OnInit{

  locataires : Locataire[];
  title = 'Liste Des Locataires'
  displayedColumns: string[] = ['id','prenom', 'nom', 'adresse', 'email', 'actif', 'action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  locataireForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    adresse: ['', Validators.required],
    email: ['', Validators.required],
    actif: ['', Validators.required],
    appartement: [null, Validators.required],
  });

  constructor(private locataireService : LocataireService,
    private appartementService : AppartementService,
    private fb : FormBuilder,
    public authService : AuthService,
    public dialog: MatDialog){}


    ngOnInit() {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez être connecté pour récupérer la liste des locataires.'
        });
        return;
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      this.loadLocataireList(headers);
     // this.loadAppartementList(headers);
    }

    
  
    loadLocataireList(headers: any) {
      this.locataireService.getAllLocataires(headers).subscribe(
        (data: Locataire[]) => {
          this.locataires = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: 'Impossible de récupérer la liste des locataires.'
          });
    
          console.error('Erreur lors de la récupération des locataires :', error);
        }
      );
    }
    
  
 //   loadAppartementList(headers: any) {
   //   this.appartementService.getAllAppartements(headers).subscribe(appartements => {
     //   this.appartements = appartements;
     // });
   // }
  
    
  
    addLocataire() {
      if (this.locataireForm.valid) {
        const locataire: Locataire = {
          id : null,
          nom: this.locataireForm.value.nom,
          prenom: this.locataireForm.value.prenom,
          adresse: this.locataireForm.value.adresse,
          email: this.locataireForm.value.email,
          actif: this.locataireForm.value.actif,
          appartement: this.locataireForm.value.appartement,
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
    
        this.locataireService.addLocataire(locataire, headers).subscribe(
          (createdlocataire) => {
            console.log('locataire created successfully:', createdlocataire);
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'La bande a été ajoutée avec succès.'
            });
            this.locataireForm.reset();
            this.loadLocataireList(headers);
          },
          (error) => {
            console.error('Erreur lors de l\'ajout d\'un locataire:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Une erreur est survenue lors de l\'ajout d\'un locataire.'
            });
          }
        );
      }
    }
  
    // Suppression
    deleteLocataire(id: number) {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer ce Locataire ?',
        text: 'Le Locataire sera définitivement supprimé!',
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
    
          this.locataireService.deleteLocataire(id, headers).subscribe(
            () => {
              Swal.fire({
                title: 'Supprimé!',
                text: 'Le Locataire a été supprimé avec succès.',
                icon: 'success'
              });
              this.locataireService.getAllLocataires(headers).subscribe(updatedLocataires => {
                this.locataires = updatedLocataires;
              });
            },
            (error) => {
              Swal.fire({
                title: 'Oups!',
                text: 'Impossible de supprimer ce locataire.',
                icon: 'error'
              });
            }
          );
        }
      });
    }

}
