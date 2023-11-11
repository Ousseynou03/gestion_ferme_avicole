import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bande } from '../models/bande.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addBande(bande: Bande, headers: any) {
    const url = `${this.baseUrl}/bande/add`;
    return this.http.post(url, bande, { headers });
  }

  //Récupération
  getAllBandes(headers: any): Observable<Bande[]> {
    return this.http.get<Bande[]>(`${this.baseUrl}/bande/all`, { headers });
  }


  // Mise à jour d'un bâtiment
  updateBande(bande: Bande, headers: any): Observable<any> {
    const url = `${this.baseUrl}/bande/update`;
    return this.http.put(url, bande, { headers });
  }

  // Suppression
  deleteBande(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/bande/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
