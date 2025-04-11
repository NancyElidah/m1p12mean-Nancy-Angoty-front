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
        let errorMessage = 'Erreur inattendue.';
        if (error.error?.error) {
          errorMessage = error.error.error;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  validatePrestation(prestation: Prestation): Observable<any> {
    return this.http.post<any>(`${this.uri}validate`, prestation).pipe(
      catchError((error) => {
        let errorMessage = 'Une erreur de validation est survenue.';
        if (error.error?.error) {
          errorMessage = error.error.error;
          console.log(errorMessage)
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getPrestation(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}findAll?page=${page}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des propos.'));
      })
    );
  }

  deletePrestation(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id };
    return this.http.request<any>('delete', `${this.uri}delete`, { headers,body}).pipe(
      catchError((error) => {
        let errorMessage = 'Une erreur est survenue.'; 
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        console.error('Erreur lors de la suppression de la prestation:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
}
