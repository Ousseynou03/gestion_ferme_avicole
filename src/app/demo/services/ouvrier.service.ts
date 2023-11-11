import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ouvrier } from '../models/ouvrier.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OuvrierService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addOuvrier(ouvrier: Ouvrier, headers: any) {
    const url = `${this.baseUrl}/ouvrier/add`;
    return this.http.post(url, ouvrier, { headers });
  }

  //Récupération
  getAllOuvriers(headers: any): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.baseUrl}/ouvrier/all`, { headers });
  }


  // Mise à jour d'un bâtiment
  updateOuvrier(ouvrier: Ouvrier, headers: any): Observable<any> {
    const url = `${this.baseUrl}/ouvrier/update`;
    return this.http.put(url, ouvrier, { headers });
  }

  // Suppression
  deleteOuvrier(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/ouvrier/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
