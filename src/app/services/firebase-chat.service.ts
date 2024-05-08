import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {

  firestore = inject(Firestore);

  saveAll(message: Message) {
    const col = collection(this.firestore, 'chat');
    return addDoc(col, message);
  }

  getAll(): Observable<Message[]> {
    const col = collection(this.firestore, 'chat');
    return collectionData(col, { idField: 'id' }) as Observable<
      Message[]
    >;
  }
}
