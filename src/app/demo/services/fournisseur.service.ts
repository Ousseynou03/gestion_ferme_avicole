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

  //Ajout
  addFournisseur(fournisseur: Fournisseur, headers: any) {
      const url = `${this.baseUrl}/fournisseur/add`;
      return this.http.post(url, fournisseur, { headers });
    }


  //Récupération
  getAllFournisseurs(headers: any): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.baseUrl}/fournisseur/all`, { headers });
  }
  

    // Mise à jour d'un bâtiment
  updateFournisseur(fournisseur: Fournisseur, headers: any): Observable<any> {
      const url = `${this.baseUrl}/fournisseur/update`;
      return this.http.put(url, fournisseur, { headers });
    }
  
    // Suppression
  deleteFournisseur(id: number, headers: any): Observable<any> {
    const url = `${this.baseUrl}/fournisseur/delete/${id}`;
    return this.http.delete(url, { headers });
  }



}
