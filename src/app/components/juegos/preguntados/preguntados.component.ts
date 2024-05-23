import { Component, OnInit, inject } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { Result } from '../../../interfaces/result';
import Swal from 'sweetalert2';
import { FirebaseAuthService } from '../../../services/firebase-auth-service.service';
import { ResultadosService } from '../../../services/resultados.service';
import { Resultados } from '../../../interfaces/resultados';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit{
  opcionUno?: string;
  opcionDos?: string;
  opcionTres?: string;
  opcionCorrecta?: string;
  puntaje: number = 0;
  pregunta: string = '';
  arrayPreguntas: Result[] = [];
  numeroPregunta: number = 1;
  indiceActual: number = 0;

  private preguntados = inject(PreguntadosService);
  puntajes = inject(ResultadosService);
  authService = inject(FirebaseAuthService);

  ngOnInit(): void {
    this.preguntados.getData().subscribe(
      (data: any) => {
        this.arrayPreguntas = data.results; // array de preguntas - respuestas
        console.log(this.arrayPreguntas);
        this.pasarProximaPregunta();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  pasarProximaPregunta() {
    this.opcionCorrecta = this.arrayPreguntas[this.indiceActual].correct_answer;
    const opcionesAll: string[] = [];
    this.pregunta = this.decodeEntities(this.arrayPreguntas[this.indiceActual].question);

    opcionesAll.push(this.arrayPreguntas[this.indiceActual].correct_answer);
    opcionesAll.push(
      this.arrayPreguntas[this.indiceActual].incorrect_answers[0]
    );
    opcionesAll.push(
      this.arrayPreguntas[this.indiceActual].incorrect_answers[1]
    );

    //Opcion 1
    const indiceAleatorio1 = Math.floor(Math.random() * opcionesAll.length);
    this.opcionUno = this.decodeEntities(opcionesAll[indiceAleatorio1]);

    //Opcion 2
    let indiceAleatorio2;
    do {
      indiceAleatorio2 = Math.floor(Math.random() * opcionesAll.length);
    } while (indiceAleatorio2 === indiceAleatorio1);
    this.opcionDos = this.decodeEntities(opcionesAll[indiceAleatorio2]);

    //Opcion 3
    let indiceAleatorio3;
    do {
      indiceAleatorio3 = Math.floor(Math.random() * opcionesAll.length);
    } while (
      indiceAleatorio3 === indiceAleatorio1 ||
      indiceAleatorio3 === indiceAleatorio2
    );
    this.opcionTres = this.decodeEntities(opcionesAll[indiceAleatorio3]);
    
  }

  verificarRespuesta(opcion: string) {
    if (opcion == 'opcion1' && this.opcionUno == this.opcionCorrecta) {
      this.puntaje++;
    } else if (opcion == 'opcion2' && this.opcionDos == this.opcionCorrecta) {
      this.puntaje++;
    } else if (opcion == 'opcion3' && this.opcionTres == this.opcionCorrecta) {
      this.puntaje++;
    }
    if (this.numeroPregunta < 10) {
      this.numeroPregunta++;
      this.indiceActual++;
      this.pasarProximaPregunta();
    } else
    {
      if(this.puntaje>=6){
        Swal.fire({
          icon: 'success',
          title: '¡Promocionaste!',
          text: 'Respuestas correctas: ' + this.puntaje,
          confirmButtonText: 'OK',
        }).then(() => {
          
          this.guardarPuntaje().then(() => {
            window.location.reload();
          });
          
        });
      }
      else if(this.puntaje<4)
        {
          Swal.fire({
            icon: 'error',
            title: 'Desaprobaste, Intentalo de nuevo',
            text: 'Respuestas correctas: ' + this.puntaje,
            confirmButtonText: 'OK',
          }).then(() => {
            
            this.guardarPuntaje().then(() => {
              window.location.reload();
            });
            
          });
        }
        else
        {
          Swal.fire({
            icon: 'warning',
            title: 'Aprobaste',
            text: 'Respuestas correctas: ' + this.puntaje,
            confirmButtonText: 'OK',
          }).then(() => {
            
            this.guardarPuntaje().then(() => {
              window.location.reload();
            });
            
          });
        }
    } 
  }

  empezarNuevoJuego() {
    window.location.reload();
  }

  
  async guardarPuntaje() {
    console.log('entro puntaje');
    let fecha = new Date();
    const resultadoAux: Resultados = {
      puntaje: this.puntaje,
      userName: this.authService.currentUserSig()?.email,
      date: `${fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} - ${fecha.toLocaleTimeString()}`,
      dateOrder: fecha,
      juego: 'Preguntados',
    };
    return await this.puntajes.saveAll(resultadoAux);
  }

  // Función para decodificar entidades HTML y caracteres especiales
  decodeEntities(encodedString: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
  }
  

}
