import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestation } from '../models/Prestation';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',  
})
export class PrestationService {
  private uri = 'http://localhost:5000/prestation/';

  constructor(private http: HttpClient) {}
  addPrestation(prestation: Prestation): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.uri}create`, prestation, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'ajout de propos:', error);
        return throwError(
          () => new Error("Une erreur s'est produite, veuillez réessayer.")
        );
      })
    );
  }
  getPrestation(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(`${this.uri}findAll`);
  }
}
