import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import {
  Resultados,
  ResultadosID,
} from '../interfaces/resultados';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  path: string = 'puntajes';
  firestore = inject(Firestore);

  saveAll(puntaje: Resultados) {
    const col = collection(this.firestore, this.path);
    return addDoc(col, puntaje);
  }

  getAll(): Observable<ResultadosID[]> {
    const col = collection(this.firestore, this.path);
    return collectionData(col, { idField: 'id' }) as Observable<
      ResultadosID[]
    >;
  }
}
