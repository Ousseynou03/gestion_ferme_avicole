import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mortalite } from '../models/moratlite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MortaliteService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addMortalite(mortalite: Mortalite, headers: any):Observable<any>  {
    const url = `${this.baseUrl}/mortalite/add`;
    return this.http.post(url, mortalite, { headers });
  }

  //Récupération
  getAllMortalites(headers: any): Observable<Mortalite[]> {
    return this.http.get<Mortalite[]>(`${this.baseUrl}/mortalite/all`, { headers });
  }


  // Update
  updateMortalite(mortalite: Mortalite, headers: any): Observable<any> {
    const url = `${this.baseUrl}/mortalite/update`;
    return this.http.put(url, mortalite, { headers });
  }

  // Suppression
  deleteMortalite(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/mortalite/delete/${id}`;
  return this.http.delete(url, { headers });
}


  //Récupération des mortalités totales 
  totalMortalite(headers : any):Observable<number> {
    const url = `${this.baseUrl}/mortalite/totalMortalite`;
    return this.http.get<number>(url,{headers})
  }
}
