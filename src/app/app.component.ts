import { Component } from '@angular/core';
import { ServidorService } from './servidor.service';
import { Visitante } from './visitante';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AngularService';
  valor: String | undefined;
  visitante?: Visitante;

  constructor(private srv: ServidorService) { }


  visualizarTXT(){

      this.srv.obter().subscribe({
        next: (res)=> {
          this.valor = res;
          console.log(this.valor);             
        },
        error: (e)=> {
          console.error(e);
        }
      });
  }

  clicaNum(){
    let valore: Number;
    this.srv.getTesteNumero().subscribe(vlr => {
      valore = vlr;
      console.log(valore);   
    }); 
  }


  servicoSimples(){

    this.srv.testeVisitanteSimples().subscribe({
      next: (res)=> {
        this.visitante = res;
        console.table(this.visitante);             
      },
      error: (e)=> {
        console.error(e);
      }
    });
}
}