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


  onSubmit(): void
  {
    this.authService.register(this.email,this.username,this.password).subscribe({
      next:()=>{
      this.router.navigateByUrl('/')},
      error: ()=>{
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('#messageError');
        element.style.display="block";
      }
    })
  }
}
