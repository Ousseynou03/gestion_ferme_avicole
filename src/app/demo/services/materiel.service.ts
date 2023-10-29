import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Materiel } from '../models/materiel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addMteriel(materiel: Materiel, headers: any) {
    const url = `${this.baseUrl}/mateiel/add`;
    return this.http.post(url, materiel, { headers });
  }

  //Récupération
  getAllMateriels(headers: any): Observable<Materiel[]> {
    return this.http.get<Materiel[]>(`${this.baseUrl}/materiel/all`, { headers });
  }


  // Mise à jour d'un mateiel
  updateMateiel(materiel: Materiel, headers: any): Observable<any> {
    const url = `${this.baseUrl}/materiel/update`;
    return this.http.put(url, materiel, { headers });
  }

  // Suppression
  deleteMateiel(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/materiel/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
