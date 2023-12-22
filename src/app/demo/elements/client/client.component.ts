import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditClientComponent } from './dialog/edit-client/edit-client.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit , AfterViewInit{

  clients: Client[] = [];
  clientForm: FormGroup;
  headers: any


  title = 'Liste Des clients'
  displayedColumns: string[] = ['id', 'nom', 'ville', 'numTel', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  client: Client = {
    id: null,
    nom: '',
    ville: '',
    numTel: ''
  };
  

  constructor(private clientService: ClientService, 
    public authService: AuthService,
    private _matDialog: MatDialog,
    private fb : FormBuilder) {
      this.clientForm = this.fb.group({
        nom: ['', Validators.required],
        ville: ['', Validators.required],
        numTel: ['', Validators.required],
      });
    }

    ngAfterViewInit() {
      if(this.paginator === undefined){
        this.dataSource.paginator = this.paginator;
      }
    }
  
  
    ngOnInit(): void {
      this.loadClientList(this.headers)
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    loadClientList(header : any){
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      this.clientService.getAllClients(headers)
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(_err)=>{
          alert("Impossible de recupere la liste des batiments!!!")
        }
      })
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
            this.loadClientList(headers);
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
            this.loadClientList(this.headers)
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

  openDialogEdit(client: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditClientComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: client,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadClientList(this.headers)
          }
      });
  }
  

}
