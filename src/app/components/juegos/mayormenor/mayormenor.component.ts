import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
//import { PuntajesService } from 'src/app/services/puntajes.service';
import Swal from 'sweetalert2';
import { Carta } from  '../../../interfaces/carta';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent {

  mazo: Carta[] = [];
  cartaActual?: Carta;
  cartaSiguiente?: Carta;
  resultado?: string;
  puntaje : number = 0;
  juego = "MayorMenor";

  //constructor(private puntajeService:PuntajesService) { } Esta es la forma vieja
  //puntajeService = inject(PuntajesService);

  ngOnInit(): void {
    this.crearMazo();
    this.iniciarJuego();
  }

  crearMazo() {
    const palos = ['basto', 'oro', 'copa', 'espada'];
    for (let numero = 1; numero <= 12; numero++) {
      for (const palo of palos) {
        this.mazo.push({ numero, palo });
      }
    }
  }

  iniciarJuego() {
    this.cartaActual = this.obtenerCartaAleatoria();
    this.cartaSiguiente = this.obtenerCartaAleatoria();
    this.resultado = '';
  }

  obtenerCartaAleatoria(): Carta {
    const indice = Math.floor(Math.random() * this.mazo.length);
    return this.mazo[indice];
  }

  verificarAdivinanza(opcion: string) {
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = this.obtenerCartaAleatoria();

    console.log(this.cartaActual)
    console.log(this.cartaSiguiente)
    if ((opcion === 'MAYOR' && this.cartaActual &&  this.cartaSiguiente.numero > this.cartaActual.numero) ||
        (opcion === 'MENOR' && this.cartaActual &&  this.cartaSiguiente.numero < this.cartaActual.numero) ||
        (opcion === 'IGUAL' && this.cartaActual &&  this.cartaSiguiente.numero === this.cartaActual.numero)) {
      this.resultado = 'Correcto';
      this.puntaje++;
    }else {
      this.resultado = 'Incorrecto';
    }
  }

  obtenerRutaImagen(carta: any): string {
    const rutaBase = '../../../../assets/mayormenor/';
    const nombreArchivo = `${carta.numero}.${carta.palo}.png`;
    return `${rutaBase}${nombreArchivo}`;
  }

  /*
  async guardarPuntaje(){
    this.puntaje = await this.puntajeService.guardarPuntaje(this.puntaje,this.juego);
  }
  */
}
