import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private http = inject(HttpClient);
  constructor() {}
  getData() {
    return this.http.get(
      'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'
    );
  }
}
