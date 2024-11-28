import { HttpClientModule } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MediaService } from './media.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import {firstValueFrom} from "rxjs"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RouterModule, AuthModule, LoginComponent, CommonModule],
  providers: [MediaService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
  title = 'muselock';

  islogged = false;

  constructor(private router: Router, public auth: AuthService){}

  ngAfterViewChecked(){
    this.auth.isAuthenticated$.subscribe(it => this.islogged = it);
  }

  login(isSignup: boolean = false){
    this.auth.loginWithRedirect({authorizationParams: {screen_hint: isSignup ? "login" : "signup"}});
  }

  logout(){
    console.log('salir');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('id');
    this.islogged = false;
    this.router.navigate(['/']);
  }
}
