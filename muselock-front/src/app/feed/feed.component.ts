import { AfterViewChecked, Component, HostListener, OnInit } from '@angular/core';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { CommonModule } from '@angular/common';
import { Publicacion } from '../clases/publicacion';
import { PublicacionService } from '../servicios/publicacion.service';
import { HttpClientModule } from '@angular/common/http';
import { faker } from '@faker-js/faker';



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
  selected: Boolean = false;
  selectedPublicacion: Publicacion | null = null;


  constructor(private publicacionService: PublicacionService){}

  getPublicaciones():void{
    this.publicacionService.getPublicaciones().subscribe((publicaciones)=>{
      this.publicaciones = publicaciones;
      this.publicacionesAgrupadas = this.agruparEnColumnas(this.publicaciones, 4);
    });
  }

  ngOnInit() {
    this.getPublicaciones();
  }

  isModalOpen = false;
  isScreenBlocked = false;

  openModal(): void {
    this.isModalOpen = true; // Abre el modal
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
    this.selectedPublicacion = null; // Limpia la selección
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.metaKey && event.shiftKey) || (event.ctrlKey && event.key === 'p')||(event.ctrlKey && event.shiftKey) ||event.key === 'PrintScreen') {
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

  onSelected(publicacion: Publicacion): void {
    this.selectedPublicacion = publicacion; // Asigna la publicación seleccionada
    this.openModal();
  }

  getRandomAvatar(): [string, string] {
     // Número aleatorio
     const randomNumber = Math.floor(Math.random() * 21); // Genera un número entre 0 y 20
    return [`https://i.pravatar.cc/${randomNumber}`, this.getRandomUsername()]; // Retorna la URL con el número aleatorio
  }

    // Lista de nombres de ejemplo para el nombre de usuario aleatorio
    private usernames = ['Usuario123', 'JuanPerez', 'MariaLopez', 'CarlosGomez', 'AnaMartinez'];

    // Función que devuelve un nombre de usuario aleatorio
    getRandomUsername(): string {
      return faker.internet.userName() // Devuelve el nombre correspondiente
    }

    getRandomName(): string {
      return faker.name.firstName() // Devuelve el nombre correspondiente
    }
  @HostListener('document:contextmenu', ['$event'])
  blockRightClick(event: MouseEvent): void {
    event.preventDefault();  // Evita la aparición del menú contextual
    //console.log('Clic derecho bloqueado');
  }

}
