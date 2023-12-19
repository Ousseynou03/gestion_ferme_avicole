import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContratLocation } from '../models/contrat-location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratLocationService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addContratLocation(contratLocation: ContratLocation, headers: any) :Observable<any>{
    const url = `${this.baseUrl}/contratLocation/add`;
    return this.http.post(url, contratLocation, { headers });
  }

  //Récupération
  getAllContratLocation(headers: any): Observable<ContratLocation[]> {
    return this.http.get<ContratLocation[]>(`${this.baseUrl}/contratLocation/all`, { headers });
  }


  // Mise à jour 
  updateContratLocation(id:any,contratLocation: ContratLocation, headers: any): Observable<any> {
    const url = `${this.baseUrl}/contratLocation/update/${id}`;
    return this.http.put(url, contratLocation, { headers });
  }

  // Suppression
  deleteContratLocation(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/contratLocation/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
