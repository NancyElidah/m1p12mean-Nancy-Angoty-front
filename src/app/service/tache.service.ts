import { Injectable } from '@angular/core';
import { Tache } from '../models/Tache';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5000/tache/';

  getAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}`);
  }
}
