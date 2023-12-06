import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{

  clients: Client[] = [];
  clientForm: FormGroup;

  client: Client = {
    id: null,
    nom: '',
    ville: '',
    numTel: ''
  };
  

  constructor(private clientService: ClientService, 
    public authService: AuthService,
    private fb : FormBuilder) {
      this.clientForm = this.fb.group({
        nom: ['', Validators.required],
        ville: ['', Validators.required],
        numTel: ['', Validators.required],
      });
    }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des clients.'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.clientService.getAllClients(headers).subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des clients.'
        });

        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
    }

    //Ajout
    addClient() {
      if (this.clientForm.valid) {
        const client = this.clientForm.value;
  
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
  
        this.clientService.addClient(client, headers).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Enregistré',
              text: 'Client ajouté avec succès'
            });
  
            console.log('Client enregistré:', response);
            this.loadClientList();
            // Réinitialisez le formulaire après l'ajout réussi
            this.clientForm.reset();
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Enregistrement non autorisé',
              text: "Vous n'êtes pas autorisé à enregistrer un client."
            });
  
            console.error('Erreur lors de l\'enregistrement d\'un client:', error);
          }
        );
      }
    }
    loadClientList() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.clientService.getAllClients(headers).subscribe(
          (data: Client[]) => {
            this.clients = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des client:', error);
          }
        );
      }
    }



  // Méthode pour mettre à jour un bâtiment
  updateClient(client: Client) {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour effectuer cette action.'
      });
      return;
    }

    // Créez un en-tête avec le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Appelez la méthode de mise à jour du service
    this.clientService.updateClient(client, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'Le client a été mis à jour avec succès.'
        });

        // Mettez à jour la liste des bâtiments (facultatif)
        this.loadClientList();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de mise à jour',
          text: 'Impossible de mettre à jour le client.'
        });

        console.error('Erreur lors de la mise à jour du client:', error);
      }
    );
  }



// Suppression
  deleteClient(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce client ?',
      text: 'Le client sera définitivement supprimé!',
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
  
        this.clientService.deleteClient(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'Le client a été supprimé avec succès.',
              icon: 'success'
            });
            this.clientService.getAllClients(headers).subscribe(updateClients => {
              this.clients = updateClients;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer ce client.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

}
