import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../paises.service';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HttpClientModule],
  providers: [PaisesService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  data: any;
  token: string = "";

  constructor(private apiPaises: PaisesService) {}
  
  obtenerPaises(){
    console.log(this.token);
    this.apiPaises.getPaises(this.token).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error("Error", error)
      }
    );
  }

  ngOnInit(): void {
      this.apiPaises.getAccessToken().subscribe(
        (response) => {
          this.token = response.auth_token;
          // this.obtenerPaises()
        },
        (error) => {
          console.error('Error', error)
        }
      );
  }

  
}
