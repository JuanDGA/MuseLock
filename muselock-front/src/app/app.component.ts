import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaService } from './media.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthModule, AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, RouterModule, AuthModule, LoginComponent],
  providers: [MediaService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'muselock';

  constructor(){}

  // login(){
  //   this.auth.loginWithRedirect();
  // }
}
