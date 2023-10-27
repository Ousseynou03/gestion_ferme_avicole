import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../models/fournisseur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllFournisseurs(headers: any): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/fournisseur/all`, { headers });
  }
}
