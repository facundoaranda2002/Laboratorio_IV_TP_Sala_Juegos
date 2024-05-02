import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { LogInterface } from '../interfaces/log';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  firestore = inject(Firestore);

  saveAll(log: LogInterface)
  {
    const col = collection(this.firestore, "logs");
    addDoc(col, log);
  }
}
