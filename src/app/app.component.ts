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
  ind: number = 0;
  lst: Visitante[]=[];

  constructor(private srv: ServidorService) { }

  clicaNum(){
    let valore: Number;
    this.srv.getTesteNumero().subscribe(vlr => {
      valore = vlr;
      console.log(valore);
    });
  }

  consultaSimples(): void{
    this.srv.consultaSimples().subscribe({
      next: (res)=> {
        this.visitante = res;
        console.table(this.visitante);
      },
      error: (e)=> {
        console.error(e);
      }
    });
}

consultaParametrizada(id:number):void {
  this.srv.consultaParametrizada(id).subscribe({
    next: (res)=> {
      this.visitante = res;
      console.table(this.visitante);
    },
    error: (e)=> {
      console.error(e);
    }
  });
}

listar(): void{
  this.srv.listar().subscribe({
    next: (res)=> {
      this.lst = res;
      console.table(this.lst);
    },
    error: (e)=> {
      console.error(e);
    }
  });
}

}
