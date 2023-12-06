import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Nutrition } from '../models/nutrition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Ajout
  addNutrition(nutrition: Nutrition, headers: any):Observable<any> {
    const url = `${this.baseUrl}/nutrition/add`;
    return this.http.post(url, nutrition, { headers });
  }

  //Récupération
  getAllNutritions(headers: any): Observable<Nutrition[]> {
    return this.http.get<Nutrition[]>(`${this.baseUrl}/nutrition/all`, { headers });
  }


  // Update Nutrition
  updateNutrition(nutrition: Nutrition, headers: any): Observable<any> {
    const url = `${this.baseUrl}/nutrition/update`;
    return this.http.put(url, nutrition, { headers });
  }

  // Suppression
  deleteNutrition(id: number, headers: any): Observable<any> {
  const url = `${this.baseUrl}/nutrition/delete/${id}`;
  return this.http.delete(url, { headers });
}

stockAliments(headers : any):Observable<number> {
  const url = `${this.baseUrl}/nutrition/stockAliments`;
  return this.http.get<number>(url,{headers})
}

alimentConsommes(headers : any):Observable<number> {
  const url = `${this.baseUrl}/nutrition/alimentConsommes`;
  return this.http.get<number>(url,{headers})
}

}
