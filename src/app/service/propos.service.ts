import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Propos } from '../models/Propos';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProposService {
  private uri = 'http://localhost:5000/propos/';

  constructor(private http: HttpClient) {}
  addPropos(propos: Propos): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.uri}create`, propos, { headers }).pipe(
      catchError((error) => {
        let errorMessage = 'Erreur inattendue.';
        if (error.error?.error) {
          errorMessage = error.error.error;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  validatePropos(propos: Propos): Observable<any> {
    return this.http.post<any>(`${this.uri}validate`, propos).pipe(
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

  getProposListe(): Observable<Propos[]> {
    return this.http.get<{ propos: Propos[] }>(`${this.uri}getAll`).pipe(
      map((data) => data.propos) 
    );
  }

  getPropos(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}findAll?page=${page}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des propos.'));
      })
    );
  }

  getProposById(id: number): Observable<Propos> {
    return this.http.get<Propos>(`${this.uri}get/${id}`);
  }

  deletePropos(id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.uri}delete/${id}`, { headers }).pipe(
      catchError((error) => {
        let errorMessage = 'Une erreur est survenue.'; 
        if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        console.error('Erreur lors de la suppression du propos:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
}
