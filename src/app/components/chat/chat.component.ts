import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseChatService } from '../../services/firebase-chat.service';
import { Message } from '../../interfaces/message';
import { CommonModule, NgFor } from '@angular/common';
import { FirebaseAuthService } from '../../services/firebase-auth-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  chat = inject(FirebaseChatService);
  fb = inject(FormBuilder);
  authService = inject(FirebaseAuthService);
  cdr = inject(ChangeDetectorRef);

  estaActivo = false;

  cambiarEstado() {
    this.estaActivo = !this.estaActivo;
    if (this.estaActivo) {
      setTimeout(() => this.scrollToTheLastElementByClassName(), 100);
    }
  }

  messages?: Message[] = [];

  ngOnInit() {
    this.chat.getAll().subscribe((messages) => {
      messages.sort((a, b) => {
        const timestampA = a.dateOrder.seconds * 1000 + a.dateOrder.nanoseconds / 1000000;
        const timestampB = b.dateOrder.seconds * 1000 + b.dateOrder.nanoseconds / 1000000;
        return timestampA - timestampB;
      });
      this.messages = messages;
      this.cdr.detectChanges();
      this.scrollToTheLastElementByClassName();
    });
  }

  form = this.fb.nonNullable.group({
    mensaje: ['', Validators.required],
  });

  enviarMensaje() {
    const value = this.form.getRawValue();

    if (!value.mensaje.trim()) {
      // No enviar mensaje si está vacío
      return;
    }

    let fecha = new Date();

    let message: Message = {
      text: value.mensaje,
      userName: this.authService.currentUserSig()?.username || '',
      date: `${fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })} - ${fecha.toLocaleTimeString()}`,
      dateOrder: fecha
    };

    this.chat.saveAll(message);
    this.form.setValue({ mensaje: '' });
    setTimeout(() => {
      this.scrollToTheLastElementByClassName();
    }, 100);
  }

  scrollToTheLastElementByClassName() {
    const container = document.getElementById("contenedorDeMensajes");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

}
