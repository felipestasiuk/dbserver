import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Voto, Resultado, Retorno } from './';

@Injectable({
  providedIn: 'root'
})
export class VotoService {

  private readonly urlBase = 'http://localhost:8080/api/db';
  private readonly urlGetVoto = this.urlBase + '/votos';
  private readonly urlPostVoto = this.urlBase + '/voto/insert';
  private readonly urlDeleteVoto = this.urlBase + '/voto/delete';
  private readonly urlGetResultado = this.urlBase + '/resultado';

  httpOptionsDelete = {
    headers: new HttpHeaders({ 'accept': '*/*' })
  }

  httpOptionsPost = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept': '*/*' })
  }

  constructor(private http: HttpClient) { }

  listar(): Observable<Retorno> {
  	return this.http.get<Retorno>(this.urlGetVoto)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  votar(voto: Voto): Observable<Retorno> {
    return this.http.post<Retorno>(this.urlPostVoto, JSON.stringify(voto), this.httpOptionsPost)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  remover(id: number): Observable<Retorno> {
    return this.http.delete<Retorno>(this.urlDeleteVoto + '/' + id, this.httpOptionsDelete)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  listarResultados(): Observable<Retorno> {
    return this.http.get<Retorno>(this.urlGetResultado)
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
