import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Veterinaire } from '../models/veterinaire.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinaireService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addVeterinaire(veterinaire: Veterinaire, headers: any):Observable<any>  {
    const url = `${this.baseUrl}/veto/add`;
    return this.http.post(url, veterinaire, { headers });
  }

  //Récupération
  getAllVeterinaire(headers: any): Observable<Veterinaire[]> {
    return this.http.get<Veterinaire[]>(`${this.baseUrl}/veto/all`, { headers });
  }


  // Update
  updateVeterinaire(id:any,veterinaire: Veterinaire, headers: any): Observable<any> {
    const url = `${this.baseUrl}/veto/update/${id}`;
    return this.http.put(url, veterinaire, { headers });
  }

  // Suppression
  deleteVeterinaire(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/veto/delete/${id}`;
  return this.http.delete(url, { headers });
}
}
