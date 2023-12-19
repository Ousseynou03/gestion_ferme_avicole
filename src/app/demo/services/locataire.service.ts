import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Locataire } from '../models/locataire.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addLocataire(locataire: Locataire, headers: any) :Observable<any>{
    const url = `${this.baseUrl}/locataire/add`;
    return this.http.post(url, locataire, { headers });
  }

  //Récupération
  getAllLocataires(headers: any): Observable<Locataire[]> {
    return this.http.get<Locataire[]>(`${this.baseUrl}/locataire/all`, { headers });
  }


  // Mise à jour 
  updateLocataire(id:any,locataire: Locataire, headers: any): Observable<any> {
    const url = `${this.baseUrl}/locataire/update/${id}`;
    return this.http.put(url, locataire, { headers });
  }

  // Suppression
  deleteLocataire(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/locataire/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
