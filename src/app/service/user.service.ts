import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  uri = 'http://localhost:5000/user/';

  addClient(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.uri}create`, user, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        return throwError(
          () => new Error("Une erreur s'est produite, veuillez réessayer.")
        );
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const url = this.uri + 'login';
    console.log('Appel API:', url, 'avec credentials:', credentials);
    return this.http.post<any>(url, credentials);
  }
}
