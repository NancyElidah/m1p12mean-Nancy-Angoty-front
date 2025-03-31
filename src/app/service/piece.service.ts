import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Piece } from '../models/Piece';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  private apiUrl = 'http://localhost:5000/piece/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Piece[]> {
    return this.http.get<Piece[]>(`${this.apiUrl}findAll`);
  }
  addPiece(piece: Piece): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}create`, piece, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur lors de l'ajout de propos:", error);
        return throwError(
          () => new Error("Une erreur s'est produite, veuillez réessayer.")
        );
      })
    );
  }
}
