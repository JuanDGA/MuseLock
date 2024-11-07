import { Component, inject } from '@angular/core';
import { LoginserviceService } from './loginservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [LoginserviceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginService = inject(LoginserviceService)
  applyForm = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  })

  constructor(){}

  submitApplication(){
    this.loginService.autenticar(
      this.applyForm.value.usuario ?? '',
      this.applyForm.value.password ?? ''
    ).subscribe({
      next: (apiData: Usuario) => {sessionStorage.setItem('usuario', apiData.nombre); console.log(apiData)},
      error: (e: string | undefined) => console.log("error")
    });
  }
}
