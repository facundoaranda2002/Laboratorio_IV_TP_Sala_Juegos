import { Component , ElementRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(FirebaseAuthService);
  router = inject(Router);
  elementRef = inject(ElementRef);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  
  onSubmit() : void
  {
    const value = this.form.getRawValue();
    this.authService.login(value.email, value.password).subscribe({
      next:()=>{
      this.router.navigateByUrl('/')},
      error: ()=>{
        /*
        const element: HTMLElement = this.elementRef.nativeElement.querySelector('#messageError');
        element.style.display="block";
        */
      }
    })
  }

}
