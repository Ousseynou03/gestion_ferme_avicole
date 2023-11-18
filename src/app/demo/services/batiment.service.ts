import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Batiment } from '../models/batiment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addBatiment(batiment: Batiment, headers: any) {
    const url = `${this.baseUrl}/batiment/add`;
    return this.http.post(url, batiment, { headers });
  }

  //Récupération
  getAllBatiments(headers: any): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${this.baseUrl}/batiment/all`, { headers });
  }


  // Mise à jour d'un bâtiment
  updateBatiment(batiment: Batiment, headers: any): Observable<any> {
    const url = `${this.baseUrl}/batiment/update`;
    return this.http.put(url, batiment, { headers });
  }

  // Suppression
  deleteBatiment(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/batiment/delete/${id}`;
  return this.http.delete(url, { headers });
}
/*
  getBatimentDesignation(id: number, headers: any): Observable<string> {
    const url = `${this.baseUrl}/batiment/designation/${id}`;
    return this.http.get<string>(url, { headers });
  }
*/

  //Récupération nombre de Batiment dans la ferme 
  countTotalBatiments(headers : any):Observable<number> {
    const url = `${this.baseUrl}/batiment/countAllBatiment`;
    return this.http.get<number>(url,{headers})
  }

  
}
