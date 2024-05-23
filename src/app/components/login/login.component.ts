import { Component , ElementRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth-service.service';
import { NgIf } from '@angular/common';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { LogInterface } from  '../../interfaces/log';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(FirebaseAuthService);
  router = inject(Router);
  elementRef = inject(ElementRef);
  storage = inject(FirebaseStorageService);

  errorMessage: string = "";


  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  
  onSubmit() : void
  {
    const value = this.form.getRawValue();
    this.authService.login(value.email, value.password).subscribe({
      next:()=>{
      this.router.navigateByUrl('/home');
      let log: LogInterface = {email: value.email, date: new Date()};
      this.storage.saveAll(log);
      },
      error: ()=>{
        this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    })
  }

  userA()
  {
    this.form.setValue({email : "lucas@gmail.com", password:"lucas123"}); 
  }
  userB()
  {
    this.form.setValue({email : "ana@gmail.com", password:"ana123"}); 
  }
  userC()
  {
    this.form.setValue({email : "juan@gmail.com", password:"juan123"});
  }

}
