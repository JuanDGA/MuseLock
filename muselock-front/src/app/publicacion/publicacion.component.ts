import { Component, EventEmitter, Output, Input, HostListener  } from '@angular/core';
import { Publicacion } from '../clases/publicacion';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent {
  @Output() close = new EventEmitter<void>();
  @Input() publicacionDetail: Publicacion | null=null;
  mostrarInf: boolean = false;
  isScreenBlack = false; // Propiedad para controlar el fondo negro

  closeModal() {
    this.close.emit();
  }

  mostrarInfo(){
    this.mostrarInf = !this.mostrarInf;
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.metaKey && event.shiftKey) || (event.ctrlKey && event.key === 'p')||(event.ctrlKey && event.shiftKey)) {
      this.blockScreen();
    }
  }

  // Función para bloquear la pantalla temporalmente
  private blockScreen() {
    this.isScreenBlack = true;
    setTimeout(() => {
      this.isScreenBlack = false;
    }, 1000); // Mantener el fondo negro por 1 segundo
  }


  @HostListener('document:contextmenu', ['$event'])
  blockRightClick(event: MouseEvent): void {
    event.preventDefault();  // Evita la aparición del menú contextual
    //console.log('Clic derecho bloqueado');
  }

 

}
