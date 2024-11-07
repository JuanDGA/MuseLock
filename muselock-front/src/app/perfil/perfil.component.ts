import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}

