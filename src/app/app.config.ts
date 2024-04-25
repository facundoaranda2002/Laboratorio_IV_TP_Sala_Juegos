import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tp2024-1ed38","appId":"1:926178927838:web:0d1600160e80fb4d804e4f","storageBucket":"tp2024-1ed38.appspot.com","apiKey":"AIzaSyDxaeIcCMxjxcouzqKIPWLI6fwJaVQnuBk","authDomain":"tp2024-1ed38.firebaseapp.com","messagingSenderId":"926178927838"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
