import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LookupService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8080/api/fridge-items'

  getUnits(): Observable<{ name: string, label: string }[]> {
    //return this.http.get<{ name: string, label: string }[]>(`${this.apiUrl}/units`);
    return this.http.get<{ name: string, label: string }[]>(`http://localhost:8080/api/fridge-items/units`);
    
  }

  getCategories(): Observable<{ name: string, label: string }[]> {
    return this.http.get<{ name: string, label: string }[]>(`${this.apiUrl}/categories`);
  }
}