import { Component, HostListener } from '@angular/core';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicacionComponent, PublicacionComponent, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  isModalOpen = false;
  isScreenBlocked = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(`Key pressed: ${event.key}`);
    if ((event.metaKey && event.shiftKey) || (event.ctrlKey && event.key === 'p')||(event.ctrlKey && event.shiftKey)) {
      this.blockScreen();
    }
  }

  @HostListener('document:visibilitychange', [])
  handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.blockScreen();
    }
  }

  // Función para bloquear la pantalla temporalmente
  private blockScreen() {
    this.isScreenBlocked = true;
    setTimeout(() => {
      this.isScreenBlocked = false;
    }, 1000); // Mantener el fondo negro por 1 segundo
  }
  

  
}
