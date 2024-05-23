import { Component, ElementRef, inject } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  authService = inject(FirebaseAuthService);
  router = inject(Router);
  elementRef = inject(ElementRef);

  email = "";
  username = "";
  password = "";

  errorMessage: string = "";


  onSubmit(): void
  {
    this.authService.register(this.email,this.username,this.password).subscribe({
      next:()=>{
        this.router.navigateByUrl('/home');
        setTimeout(()=>{window.location.reload()}, 1000);
    },
      error: ()=>{
        this.errorMessage = 'Credenciales invalidas o mail ya registrado';
      }
    })
  }
}
