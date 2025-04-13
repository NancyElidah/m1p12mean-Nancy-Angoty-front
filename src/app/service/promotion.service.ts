import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Promotion } from '../models/Promotion';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  private uri = 'http://localhost:5000/promotion/';

  constructor(private http: HttpClient) {}
  addPromotion(promotions: Promotion): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.uri}create`, promotions, { headers }).pipe(
      catchError((error) => {
        let errorMessage = 'Erreur inattendue.';
        if (error.error?.error) {
          errorMessage = error.error.error;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  validateForm(promotions: Promotion): Observable<any> {
    console.log("ato amin'ny validation", promotions);
    return this.http.post<any>(`${this.uri}validate`, promotions).pipe(
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

  getPrestationListe(): Observable<Promotion[]> {
    return this.http.get<{ promotions: Promotion[] }>(`${this.uri}getAll`).pipe(
      map((data) => data.promotions) 
    );
  }

  getPromotions(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.uri}findAll?page=${page}&limit=${limit}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des promotions:', error);
        return throwError(() => new Error('Une erreur s\'est produite lors de la récupération des promotions.'));
      })
    );
  }

  validatePromotion(id: string, statut: number): Observable<any> {
    return this.http.patch<any>(`${this.uri}validate`, { id, statut }).pipe(
      catchError((error) => {
        let errorMessage = 'Une erreur est survenue lors du changement de statut.';
        if (error.error?.error) {
          errorMessage = error.error.error;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  retirerPromotion(id: string): Observable<any> {
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
