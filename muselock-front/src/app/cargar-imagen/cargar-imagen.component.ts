import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-cargar-imagen',
  standalone: true,
  imports: [HttpClientModule],
  providers: [MediaService],
  templateUrl: './cargar-imagen.component.html',
  styleUrl: './cargar-imagen.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CargarImagenComponent {

  constructor(private mediaService: MediaService){}

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
      this.previewContainer.nativeElement.appendChild(image);
    };
    fileReader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    const usuarioId = sessionStorage.getItem('id');
    
    if (usuarioId != null){
      formData.append('id', usuarioId);
    }

    console.log(formData);

    this.mediaService.uploadFile(formData).subscribe(
      response => {
        console.log('response', response);
      }
    )
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
