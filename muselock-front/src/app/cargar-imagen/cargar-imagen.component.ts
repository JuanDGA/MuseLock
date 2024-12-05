import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaService } from '../media.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargar-imagen',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [MediaService],
  templateUrl: './cargar-imagen.component.html',
  styleUrl: './cargar-imagen.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CargarImagenComponent {
  imagenUrl!: string;
  hash!: string;

  constructor(private mediaService: MediaService) { }

  // selectedFile: File | null = null;  // Variable para almacenar el archivo seleccionado

  @ViewChild('dropArea') dropArea!: ElementRef;
  @ViewChild('dragText') dragText!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('previewContainer') previewContainer!: ElementRef;

  file: File | null = null;

  onButtonClick() {
    this.inputFile.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.dropArea.nativeElement.classList.add('active');
      this.processFile(this.file);
      this.dropArea.nativeElement.classList.remove('active');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dropArea.nativeElement.classList.add('active');
    this.dragText.nativeElement.textContent = "Suelta la imagen para subirla";
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dropArea.nativeElement.classList.remove('active');
    this.dragText.nativeElement.textContent = "Drag and drop a image here";
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.file = event.dataTransfer.files[0];
      this.processFile(this.file);
      this.dropArea.nativeElement.classList.remove('active');
      this.dragText.nativeElement.textContent = "Generando hash";
    }
  }

  processFile(file: File) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileUrl = fileReader.result as string;
      const image = document.createElement("img");
      image.src = fileUrl;
      image.alt = file.name;

      this.previewContainer.nativeElement.innerHTML = "";
      this.imagenUrl = fileUrl;
      // this.previewContainer.nativeElement.appendChild(image);
    };
    fileReader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    const usuarioId = sessionStorage.getItem('id');

    if (usuarioId != null) {
      formData.append('id', usuarioId);
    }

    console.log(formData);

    this.mediaService.uploadFile(formData).subscribe(
      response => {
        console.log('response', response);
        this.hash = response.hash;

        setTimeout(() => {
          this.showPopup();
        }, 2000);
      },
      error => {
        console.error('Error al subir la imagen:', error);

        setTimeout(() => {
          this.showErrorPopup();
        }, 2000);
      }
    );
  }

  // Método para mostrar el pop-up
  showPopup(): void {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '30px';
    popup.style.borderRadius = '12px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '1000';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.width = '300px';

    // Popup content
    popup.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h2 style="color: #861657; font-size: 20px; margin-bottom: 10px;">¡Felicidades!</h2>
        <p style="font-size: 16px; color: #555;">Tu imagen ha sido cargada con éxito.</p>
      </div>
      <div style="display: flex; justify-content: center;">
      <button id="redirectButton" style="
        padding: 10px 20px;
        border: none;
        background-color: #861657;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;">
        Regresar al feed
      </button>
    </div>
    `;

    // Add hover effect for the button
    const style = document.createElement('style');
    style.innerHTML = `
      #redirectButton:hover {
        background-color: #6a1346;
      }
    `;
    document.head.appendChild(style);

    // Append popup to body
    document.body.appendChild(popup);

    // Listen for button click
    const redirectButton = document.getElementById('redirectButton');
    if (redirectButton) {
      redirectButton.addEventListener('click', () => {
        //window.location.href = 'https://muselock.site/';
        window.location.href = 'https://server.muselock.site/api/publicaciones/';
      });
    }
  }

  // Método para mostrar el pop-up de error
  showErrorPopup(): void {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '30px';
    popup.style.borderRadius = '12px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '1000';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.width = '300px';

    // Contenido del pop-up
    popup.innerHTML = `
    <div style="margin-bottom: 20px;">
      <h2 style="color: #861657; font-size: 20px; margin-bottom: 10px;">Lo sentimos</h2>
      <p style="font-size: 16px; color: #555;">Tu imagen no pudo ser subida</p>
    </div>
    <div style="display: flex; justify-content: center;">
      <button id="redirectButton" style="
        padding: 10px 20px;
        border: none;
        background-color: #861657;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;">
        Regresar al feed
      </button>
    </div>
  `;

    // Agregar efecto hover al botón
    const style = document.createElement('style');
    style.innerHTML = `
    #redirectButton:hover {
      background-color: #6a1346;
    }
  `;
    document.head.appendChild(style);

    // Añadir el pop-up al cuerpo del documento
    document.body.appendChild(popup);

    // Redirigir al feed al hacer clic en el botón
    const redirectButton = document.getElementById('redirectButton');
    if (redirectButton) {
      redirectButton.addEventListener('click', () => {
        //window.location.href = 'https://muselock.site/';
        window.location.href = 'https://server.muselock.site/api/publicaciones/';
      });
    }
  }


  // upload(){

  //   if (this.selectedFile){
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);

  //     this.mediaService.uploadFile(formData).subscribe(
  //       response => {
  //         console.log('response', response);
  //       }
  //     )
  //   }
  // }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   console.log("AAAA")
  //   if (file) {
  //     this.selectedFile = file;
  //   }
  // }
}
