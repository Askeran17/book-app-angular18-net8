import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Quote {
  id?: number;
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`)
      .pipe(catchError(this.handleError));
  }

  getQuote(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/quotes/${id}`)
      .pipe(catchError(this.handleError));
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.apiUrl}/quotes`, quote)
      .pipe(catchError(this.handleError));
  }

  updateQuote(quote: Quote): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/quotes/${quote.id}`, quote)
      .pipe(catchError(this.handleError));
  }

  deleteQuote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quotes/${id}`)
      .pipe(catchError(this.handleError));
  }
}
