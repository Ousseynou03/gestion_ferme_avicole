import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Oeuf } from '../models/oeuf.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OeufService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addOeuf(oeuf: Oeuf, headers: any):Observable<any> {
    const url = `${this.baseUrl}/ponte/add`;
    return this.http.post(url, oeuf, { headers });
  }

  //Récupération
  getAllOeufs(headers: any): Observable<Oeuf[]> {
    return this.http.get<Oeuf[]>(`${this.baseUrl}/ponte/all`, { headers });
  }


  // Mise à jour d'un stock oeuf
  updateOeuf(oeuf: Oeuf, headers: any): Observable<any> {
    const url = `${this.baseUrl}/ponte/update`;
    return this.http.put(url, oeuf, { headers });
  }

  // Suppression
  deleteOeuf(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/ponte/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
