import { Component, HostListener, OnInit } from '@angular/core';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { CommonModule } from '@angular/common';
import { Publicacion } from '../clases/publicacion';
import { PublicacionService } from '../servicios/publicacion.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicacionComponent, PublicacionComponent, CommonModule, HttpClientModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  publicaciones: Array<Publicacion> = [];
  publicacionesAgrupadas: any[] = [];

  constructor(private publicacionService: PublicacionService){}

  getPublicaciones():void{
    this.publicacionService.getPublicaciones().subscribe((publicaciones)=>{
      this.publicaciones = publicaciones;
    });
  }

  ngOnInit() {
    this.getPublicaciones();
    this.publicacionesAgrupadas = this.agruparEnColumnas(this.publicaciones, 4);
  }

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
  
  agruparEnColumnas(array: any[], tamanio: number): any[] {
    const resultado: any[] = [];
    for (let i = 0; i < tamanio; i++) {
      resultado.push([]);
    }
    array.forEach((item, index) => {
      resultado[index % tamanio].push(item);
    });
    return resultado;
  }
  
}
