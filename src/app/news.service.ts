import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient) { }

  getNews(): Observable<any> {
    let apiUrl = environment.newsApiUrl;
    apiUrl += "?api-key=" + environment.newsApiKey;
    return this.httpClient.get(apiUrl).pipe(catchError(NewsService.handleError));
  }

  static handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}


