import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit{

  users: User[] = [];
  headers : any;


  title = 'Liste Des Users'
  displayedColumns: string[] = ['id', 'name', 'contactNumber', 'email', 'role', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user: User = {
    name: '',
    contactNumber: '',
    email: '',
    password: '',
    id: 0,
    role :'',
    status : ''
  };

  constructor(public authService: AuthService,private _matDialog: MatDialog) {}

  ngAfterViewInit() {
    if(this.paginator === undefined){
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit(): void {
    this.loadUserList(this.headers)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUserList(header : any){
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    this.authService.getAllUsers(headers)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(_err)=>{
        alert("Impossible de recupere la liste des users!!!")
      }
    })
  }



  signUp() {
    // Récupérez le token JWT du localStorage (ou d'où vous le stockez)
    const token = localStorage.getItem('token');

    if (!token) {
      // Gérez l'absence de token, par exemple, en redirigeant l'utilisateur vers la page de connexion
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté en tant que administrateur pour effectuer cette action.'
      });
      return;
    }

    // Créez un en-tête pour inclure le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Effectuez la requête HTTP avec le token dans l'en-tête
    this.authService.signUp(this.user, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'L\'utilisateur a été enregistré avec succès.'
        });

        console.log('Utilisateur enregistré:', response);
                // Une fois l'inscription réussie, rechargez la liste des utilisateurs
                this.loadUserList(this.headers);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n/'êtes pas autorisé à enregistrer un utilisateur ."
        });

        console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      }
    );
  }




  // Suppression
  deleteUser(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet utilisateur ?',
      text: 'L\'utilisateur définitivement supprimé!',
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

        this.authService.deleteUser(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L\'utilisateur a été supprimé avec succès.',
              icon: 'success'
            });
            this.authService.getAllUsers(headers).subscribe(updatedUsers => {
              this.users = updatedUsers;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cet utilisateur.',
              icon: 'error'
            });
          }
        );
      }
    });
  }



  openDialogEdit(user: any) :void{
    // Open the dialog
    const dialogRef = this._matDialog.open(EditUserComponent, {
      backdropClass: 'my-full-screen-dialog',
      panelClass:'my-panelClass-dialog',
      width:'50%',
      data: user,
      disableClose: true
  });

  dialogRef.afterClosed()
      .subscribe((result) => {
          console.log("#######################   resulta dialog @@@@@@@@@@@@@@@@@@@",result)
          if(result == true){

            this.loadUserList(this.headers)
          }
      });
  }
}
