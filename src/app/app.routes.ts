import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'registro',
        loadComponent: () => import('./components/registro/registro.component').then((m) => m.RegistroComponent)
    },
    {
        path: 'aboutme',
        loadComponent: () => import('./components/aboutme/aboutme.component').then((m) => m.AboutmeComponent)
    },
    {
        path: 'error',
        loadComponent: () => import('./components/error/error.component').then((m) => m.ErrorComponent)
    },
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
      },
    {
        path: '**',
        redirectTo: 'error',
    },
];
