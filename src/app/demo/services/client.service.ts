import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


    //Ajout
    addClient(client: Client, headers: any) {
      const url = `${this.baseUrl}/client/add`;
      return this.http.post(url, client, { headers });
    }
  
    //Récupération
    getAllClients(headers: any): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.baseUrl}/client/all`, { headers });
    }
  
  
    // Mise à jour d'un client
    updateClient(id : any, client: Client, headers: any): Observable<any> {
      const url = `${this.baseUrl}/client/update/${id}`;
      return this.http.put(url, client, { headers });
    }
  
    // Suppression
    deleteClient(id: number, headers: any): Observable<any> {
    const url = `${this.baseUrl}/client/delete/${id}`;
    return this.http.delete(url, { headers });
  }


}
