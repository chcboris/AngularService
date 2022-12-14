import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Visitante } from './visitante';

@Injectable({
  providedIn: 'root',
})
export class ServidorService {
  url = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) {}

  //acionando um get retornando um jason
  consultaSimples(): Observable<Visitante> {
    return this.http.get<Visitante>(
      this.url + `acessoVisitante/testeConsultarVisitante`
    );
  }

  consultaParametrizada(ind: number): Observable<Visitante> {
    return this.http.get<Visitante>(
      this.url + `acessoVisitante/testeObterVisitante/${ind}`
    );
  }

  listar(): Observable<Visitante[]> {
    return this.http.get<Visitante[]>(this.url + 'acessoVisitante/testeListar');
  }

  getTesteNumero(): Observable<Number> {
    return this.http
      .get<Number>(this.url + 'acessoVisitante/numero')
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
