import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Voto, Resultado } from './';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  private readonly urlBase = 'http://localhost:8080/api/db';
  private readonly urlGetVoto = this.urlBase + '/votos';
  private readonly urlPostVoto = this.urlBase + '/voto/insert';
  private readonly urlDeleteVoto = this.urlBase + '/voto/delete/';
  private readonly urlGetResultado = this.urlBase + '/resultado';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  listar(): Observable<Voto[]> {
  	return this.http.get<Voto[]>(this.urlGetVoto)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  votar(voto: Voto): Observable<Voto[]> {
    return this.http.post<Voto[]>(this.urlPostVoto, JSON.stringify(voto), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  remover(id: number): void {
    this.http.delete<Voto>(this.urlDeleteVoto + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  listarResultados(): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(this.urlGetResultado)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };
  
}
