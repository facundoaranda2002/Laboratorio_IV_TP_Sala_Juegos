import { NgIf, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
//import { PuntajesService } from 'src/app/services/puntajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  title = "Ahorcado";
  palabraOculta = "";
  intentos = 0;
  gano = false;
  perdio = false;
  puntaje = 0;
  letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  botonesHabilitados: boolean[] = Array(this.letras.length).fill(true); // Inicialmente, todos los botones están habilitados

   palabras: string[] = [
    "Manzana",
    "Perro",
    "Gato",
    "Casa",
    "Sol",
    "Arbol",
    "Computadora",
    "Pelota",
    "Montana",
    "Libro",
    "Guitarra",
    "Pintura",
    "Jirafa",
    "Elefante",
    "Chocolate",
    "Pizza",
    "Rio",
    "Avion",
    "Barco",
    "Telefono",
    "Camara",
    "Luna",
    "Estrella",
    "Camisa",
    "Pantalon",
    "Zapatos",
    "Sombrero",
    "Reloj",
    "Calcetines",
    "Flor",
    "Silla",
    "Mesa",
    "Tren",
    "Globo",
    "Helado",
    "Mariposa",
    "Dinosaurio",
    "Helicoptero",
    "Pescado",
    "Tortuga",
    "Platano",
    "Heladera",
    "Radio",
    "Espejo",
    "Guitarra",
    "Teclado",
    "Escalera",
    "Piano",
    "Sirena",
    "Cepillo"    
  ];
  palabra = this.palabraAleatoria().toLowerCase();
    
   palabraAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio];
  }

  /*
  constructor(private router :Router,private puntajeService: PuntajesService) {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }
  */
  router = inject(Router);
  //puntajeService = inject(PuntajesService);
  ngOnInit(): void {
    this.palabraOculta = "_ ".repeat(this.palabra.length);
  }

  comprobar(letra:any) {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");

    const indice = this.letras.indexOf(letra);
    if (indice !== -1) {
      this.botonesHabilitados[indice] = false;
    }

    for (let i = 0; i <= this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
  }
  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");

    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      Swal.fire({
        icon: 'success',
        title: 'Ganaste!!!',
        //text: "Puntos: "+ this.palabra.length
      })
      this.puntaje += this.palabra.length;
    }
    if (this.intentos === 6) {
      this.perdio = true;
      Swal.fire({
        icon: 'error',
        title: 'Perdiste, intentalo nuevamente!',
        html: 'La palabra correcta era: <b>'+this.palabra+"</b>"
      })
    }
  }

  existeLetra(letra:any) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }
  }
  
  /*
  async guardarPuntaje(){
    this.puntaje = await this.puntajeService.guardarPuntaje(this.puntaje,this.title);
  }
  */

  empezarNuevoJuego(){
    this.router.navigateByUrl('/refreshAhorcado', {skipLocationChange: true}).then(()=> this.router.navigate(["ahorcado"]));
  }

}
