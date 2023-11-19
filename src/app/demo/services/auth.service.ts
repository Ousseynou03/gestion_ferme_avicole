import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = environment.apiUrl;

  currentUser = {};

  constructor(private http: HttpClient,
    public router: Router) { }

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
    return localStorage.getItem('token');
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


// User profile
getUserProfile(id: any, headers: any): Observable<any> {
  let api = `${this.baseUrl}/user_profil/${id}`;
  return this.http.get(api, { headers }).pipe(
    map((res) => {
      return res || {};
    }),
    catchError(this.handleError)
  );
}
// Error
handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}

}
