export interface ResultadosID extends Resultados {
    id: String;
  }
  
  export interface Resultados {
    puntaje: number;
    userName: string | undefined;
    date: string;
    dateOrder: any;
    juego: string;
  }