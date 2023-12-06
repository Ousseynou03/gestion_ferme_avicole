import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Vente } from '../../models/vente.model';
import { Client } from '../../models/client.model';
import { Tresorerie } from '../../models/tresorerie.model';
import { Bande } from '../../models/bande.model';

import { VenteService } from '../../services/vente.service';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { TresorerieService } from '../../services/tresorerie.service';
import { BandeService } from '../../services/bande.service';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  ventes: Vente[];
  venteForm: FormGroup;
  tresoreries: Tresorerie[];
  clients: Client[] = [];
  filteredClients: Client[] = [];
  bandes: Bande[];
  totalMontant: number = 0;

  constructor(
    private venteService: VenteService,
    private fb: FormBuilder,
    private tresoreriService: TresorerieService,
    private bandeService: BandeService,
    public authService: AuthService,
    private clientService: ClientService
  ) {}

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
    this.loadClientList();
    this.loadTresorerieList(headers);
    this.loadBandeList(headers);

    this.venteForm = this.fb.group({
      quantite: new FormControl(),
      prixUnitaire: new FormControl(),
      montant: new FormControl(),
      description: new FormControl(),
      client: new FormControl(),
      bande: new FormControl(),
      tresorerie: new FormControl()
    });

    this.venteForm
      .get('client')
      .valueChanges.pipe(startWith(''), map((value) => this._filterClients(value)))
      .subscribe((filteredClients) => {
        this.filteredClients = filteredClients.slice(0, 10);
      });
  }

  private _filterClients(value: string): Client[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter((client) => client.nom.toLowerCase().includes(filterValue));
  }

  displayClient(client: Client): string {
    return client && client.nom ? client.nom : '';
  }

  addClient() {
    const selectedClient = this.venteForm.get('client').value;

    // Vérifiez si le client sélectionné existe déjà dans la liste
    const existingClient = this.clients.find((client) => client.id === selectedClient?.id);

    if (!existingClient) {
      // Si le client n'existe pas, ajoutez-le à la liste
      this.clientService.addClient(selectedClient, {}).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Client ajouté avec succès'
          });

          console.log('Client enregistré:', response);
          this.loadClientList();
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

  addVente() {
    const venteData = this.venteForm.value;

    // Vérifiez si le client sélectionné existe déjà dans la liste
    const existingClient = this.clients.find((client) => client.id === venteData.client?.id);

    if (!existingClient) {
      // Si le client n'existe pas, ajoutez-le à la liste
      this.clientService.addClient(venteData.client, {}).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Client ajouté avec succès'
          });

          console.log('Client enregistré:', response);
          this.loadClientList();

          // Continuez ici avec l'ajout de la vente après avoir ajouté le client
          this.venteService.addVente(venteData, {}).subscribe(
            (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Enregistré',
                text: 'Vente ajoutée avec succès'
              });

              console.log('Vente enregistrée:', response);
              this.loadVenteList({});
            },
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Enregistrement non autorisé',
                text: "Vous n'êtes pas autorisé à enregistrer une vente."
              });

              console.error('Erreur lors de l\'enregistrement d\'une vente:', error);
            }
          );
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
    } else {
      // Le client existe déjà, continuez avec l'ajout de la vente
      // ...

      this.venteService.addVente(venteData, {}).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Enregistré',
            text: 'Vente ajoutée avec succès'
          });

          console.log('Vente enregistrée:', response);
          this.loadVenteList({});
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Enregistrement non autorisé',
            text: "Vous n'êtes pas autorisé à enregistrer une vente."
          });

          console.error('Erreur lors de l\'enregistrement d\'une vente:', error);
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

  loadBandeList(headers: any) {
    this.bandeService.getAllBandes(headers).subscribe(
      (data: Bande[]) => {
        this.bandes = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des bandes.'
        });

        console.error('Erreur lors de la récupération des bandes :', error);
      }
    );
  }

  private calculateTotalMontant(): void {
    this.totalMontant = this.ventes.reduce((total, vente) => total + vente.montant, 0);
  }

}
