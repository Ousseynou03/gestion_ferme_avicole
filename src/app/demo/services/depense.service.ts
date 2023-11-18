import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Depense } from '../models/depense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addDepense(depense: Depense, headers: any):Observable<any> {
    const url = `${this.baseUrl}/depense/add`;
    return this.http.post(url, depense, { headers });
  }

  //Récupération
  getAllDepenses(headers: any): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.baseUrl}/depense/all`, { headers });
  }


  // Mise à jour d'un bâtiment
  updateDepense(depense: Depense, headers: any): Observable<any> {
    const url = `${this.baseUrl}/depense/update`;
    return this.http.put(url, depense, { headers });
  }

  // Suppression
  deleteDepense(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/depense/delete/${id}`;
  return this.http.delete(url, { headers });
}

  //Récupération des dépenses totales 
  totalDepense(headers : any):Observable<number> {
    const url = `${this.baseUrl}/depense/totalDepenses`;
    return this.http.get<number>(url,{headers})
  }
}
