import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() {

    // this.regresarObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   numero => console.log('Subs', numero),
    //   error => console.error('Error en el obs', error),
    //   () => console.log('El obervador termino')
    // );

    this.subcription = this.regresarObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El obervador termino')
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');

    this.subcription.unsubscribe();
  }

  regresarObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo =  setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador,
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   //clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }

      }, 1000);

    }).pipe(
      map( resp  => resp.valor),
      filter( ( valor, index ) => {
        // console.log('Filter', valor, index);

        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
