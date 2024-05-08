import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth-service.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(FirebaseAuthService);
}
