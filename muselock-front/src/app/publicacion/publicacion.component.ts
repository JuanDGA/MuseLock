import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Publicacion } from '../clases/publicacion';
@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent {
  @Output() close = new EventEmitter<void>();
  @Input() publicacionDetail: Publicacion | null=null;
  mostrarInf: boolean = false;

  closeModal() {
    this.close.emit();
  }

  mostrarInfo(){
    this.mostrarInf = !this.mostrarInf;
  }
}
