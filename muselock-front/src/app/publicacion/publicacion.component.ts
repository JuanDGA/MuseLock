import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent {
  @Output() close = new EventEmitter<void>();
  mostrarInf: boolean = false;

  closeModal() {
    this.close.emit();
  }

  mostrarInfo(){
    this.mostrarInf = !this.mostrarInf;
  }
}
