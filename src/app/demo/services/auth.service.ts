import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

  
}
