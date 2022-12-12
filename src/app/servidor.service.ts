import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Visitante } from './visitante';


@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  url = 'http://localhost:4200/api/';

  constructor(private http: HttpClient) { }

  obter(): Observable<String> {
    console.log(this.url + `acessoVisitante/texto`);
   return this.http.get<String>(this.url + `acessoVisitante/texto`);
}

//acionando um get retornando um jason
testeVisitanteSimples(): Observable<Visitante> {
  console.log(this.url + `acessoVisitante/testarVisitante`);
 return this.http.get<Visitante>(this.url + `acessoVisitante/testarVisitante`);
}

getTesteNumero(): Observable<Number> {
      
  return this.http.get<Number>(this.url + 'acessoVisitante/numero')
    .pipe(
      retry(2),
      catchError(this.handleError))
}

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}


/*
 obterDiploma(impressaoId:number): Observable<Blob> {
      console.log(Constantes.endpoint + `impressaoDiploma/obterDiploma/${impressaoId}`);
     return this.http.get<Blob>(Constantes.endpoint + `impressaoDiploma/obterDiploma/${impressaoId}`,  { responseType: 'blob' as 'json' });
  }

*/