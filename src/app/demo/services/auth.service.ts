import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false

  roles : any

  username : any

  token : string



  baseUrl = environment.apiUrl;

  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {
    // Vérifiez si le token est présent lors de l'initialisation de l'application
    if (this.isLoggedIn()) {
      this.loadProfile({ token: this.getToken() });
    }
  }
  

  signUp(user: User, headers: any) {
    const url = `${this.baseUrl}/user/signup`;
    return this.http.post(url, user, { headers });
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.baseUrl}/user/login`, credentials);
  }

  getAllUsers(headers: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/get`, { headers });
  }


  //Récupérer un utilisateur sachant son id
  getUserById(id : number,headers: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/name/${id}`, { headers });
  }

    // Mise à jour d'un bâtiment
    updateUser(user: User, headers: any): Observable<any> {
      const url = `${this.baseUrl}/user/update`;
      return this.http.put(url, user, { headers });
    }
  
    // Suppression
    deleteUser(id: number, headers: any): Observable<any> {
    const url = `${this.baseUrl}/user/delete/${id}`;
    return this.http.delete(url, { headers });
  }


   getToken() {
    this.token = localStorage.getItem('token')
    return this.token;
  }


  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }


  //Logout
  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }


  // Charger les informations utilisateur authentifié
  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.token = data['token'];

    let decodedJWT: any = jwtDecode(this.token);

    this.username = decodedJWT.sub;
    this.roles = decodedJWT.role;
  }

  fetchRoles(): Observable<any> {
    // Utilisez la fonction `of` pour retourner les rôles stockés
    return of(this.roles);
  }


  getHeadersWithToken(): HttpHeaders {
    const authToken = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return headers;
  }

changePassword(passwords: { oldPassword: string, newPassword: string }): Observable<any> {
  const headers = this.getHeadersWithToken();
  return this.http.post(`${this.baseUrl}/user/changePassword`, passwords, { headers });
}




}
