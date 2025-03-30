import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Propos } from '../models/Propos';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Fournisseur pour le service
})
export class ProposService {
  private uri = 'http://localhost:5000/propos/';

  constructor(private http: HttpClient) {}
  addPropos(propos: Propos): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.uri}create`, propos, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur lors de l\'ajout de propos:', error);
        return throwError(
          () => new Error("Une erreur s'est produite, veuillez réessayer.")
        );
      })
    );
  }
  getPropos(): Observable<Propos[]> {
    return this.http.get<Propos[]>(`${this.uri}findAll`);
  }
  getProposById(id: number): Observable<Propos> {
    return this.http.get<Propos>(`${this.uri}get/${id}`);
  }
}
