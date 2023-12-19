import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Paiement } from '../models/paiement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addPaiement(paiement: Paiement, headers: any) :Observable<any>{
    const url = `${this.baseUrl}/paiement/add`;
    return this.http.post(url, paiement, { headers });
  }

  //Récupération
  getAllPaiement(headers: any): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.baseUrl}/paiement/all`, { headers });
  }


  // Mise à jour 
  updatePaiement(id:any,paiement: Paiement, headers: any): Observable<any> {
    const url = `${this.baseUrl}/paiement/update/${id}`;
    return this.http.put(url, paiement, { headers });
  }

  // Suppression
  deletePaiement(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/paiement/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
