import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tresorerie } from '../models/tresorerie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TresorerieService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addTresorerie(tresorerie: Tresorerie, headers: any):Observable<any> {
    const url = `${this.baseUrl}/tresorerie/add`;
    return this.http.post(url, tresorerie, { headers });
  }

  //Récupération
  getAllTresoreries(headers: any): Observable<Tresorerie[]> {
    return this.http.get<Tresorerie[]>(`${this.baseUrl}/tresorerie/all`, { headers });
  }


  // Update
  updateTresorerie(id:any,tresorerie: Tresorerie, headers: any): Observable<any> {
    const url = `${this.baseUrl}/tresorerie/update/${id}`;
    return this.http.put(url, tresorerie, { headers });
  }

  // Suppression
  deleteTresorerie(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/tresorerie/delete/${id}`;
  return this.http.delete(url, { headers });
}

  //Récupération du solde de tresorerie 
  sommeTotaleTresorerie(headers : any):Observable<number> {
    const url = `${this.baseUrl}/tresorerie/solde`;
    return this.http.get<number>(url,{headers})
  }
}
