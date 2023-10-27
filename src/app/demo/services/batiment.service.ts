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

  addBatiment(batiment: Batiment, headers: any) {
    const url = `${this.baseUrl}/batiment/add`;
    return this.http.post(url, batiment, { headers });
  }

  getAllBatiments(headers: any): Observable<Batiment[]> {
    return this.http.get<Batiment[]>(`${this.baseUrl}/batiment/all`, { headers });
  }

  
  
}
