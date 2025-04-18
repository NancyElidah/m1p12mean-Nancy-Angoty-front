import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let modifiedReq = req;

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token,
      });

      modifiedReq = req.clone({ headers });
    }

    return next.handle(modifiedReq);
  }
}
