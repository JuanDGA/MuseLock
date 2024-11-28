import {Component, OnInit} from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import {AuthService} from "@auth0/auth0-angular";
import {HttpClient} from "@angular/common/http";
import {concatMap, firstValueFrom, map, tap} from "rxjs";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  user: any = {};
  constructor(public auth: AuthService, private http: HttpClient) { }

  private async getToken(): Promise<string> {
    return await firstValueFrom(this.auth.getAccessTokenSilently());
  }

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        tap(user => {
          // Use HttpClient to make the call
          this.user = user!
        }),
      )
      .subscribe();
  }

  protected readonly JSON = JSON;
}

