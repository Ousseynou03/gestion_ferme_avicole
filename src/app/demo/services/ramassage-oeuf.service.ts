import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ramassage } from '../models/ramassage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RamassageOeufService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addRamassageOeuf(ramassage: Ramassage, headers: any):Observable<any> {
    const url = `${this.baseUrl}/ramassage/add`;
    return this.http.post(url, ramassage, { headers });
  }

  //Récupération
  getAllRamassages(headers: any): Observable<Ramassage[]> {
    return this.http.get<Ramassage[]>(`${this.baseUrl}/ramassage/all`, { headers });
  }


  // Mise à jour d'un ramassage
  updateRamassage(id:any,ramassage: Ramassage, headers: any): Observable<any> {
    const url = `${this.baseUrl}/ramassage/update/${id}`;
    return this.http.put(url, ramassage, { headers });
  }

  // Suppression
  deleteRamassage(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/ramassage/delete/${id}`;
  return this.http.delete(url, { headers });
}

nbreTotalOeufRamassage(headers : any):Observable<number> {
  const url = `${this.baseUrl}/ramassage/nbreTotalOeufRamassage`;
  return this.http.get<number>(url,{headers})
}

totalOeufs(headers : any):Observable<number> {
  const url = `${this.baseUrl}/ramassage/totalOeufs`;
  return this.http.get<number>(url,{headers})
}



}
