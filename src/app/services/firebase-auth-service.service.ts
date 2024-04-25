import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class FirebaseAuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<User |null | undefined>(undefined);

  register(email: string, username: string, password: string) : Observable<void>
  {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email , password).then(r=>updateProfile(r.user,{displayName: username}));
    return from(promise);
  }

  login(email:string, password:string):Observable<void>
  {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(()=>{
    })
    return from(promise);
  }
  logout():Observable<void>
  {
    const promise = signOut(this.firebaseAuth)
    return from(promise);
  }

  
}
