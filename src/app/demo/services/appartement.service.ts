import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appartement } from '../models/appartement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppartementService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addAppartement(appartement: Appartement, headers: any) :Observable<any>{
    const url = `${this.baseUrl}/appartement/add`;
    return this.http.post(url, appartement, { headers });
  }

  //Récupération
  getAllAppartements(headers: any): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(`${this.baseUrl}/appartement/all`, { headers });
  }


  // Mise à jour 
  updateAppartement(appartement: Appartement, headers: any): Observable<any> {
    const url = `${this.baseUrl}/appartement/update`;
    return this.http.put(url, appartement, { headers });
  }

  // Suppression
  deleteAppartement(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/appartement/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
