import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from '../clases/publicacion';

@Component({
  selector: 'app-publicacion-detail',
  standalone: true,
  templateUrl: './publicacion-detail.component.html',
  styleUrls: ['./publicacion-detail.component.css']
})
export class PublicacionDetailComponent implements OnInit {

  @Input() publicacionDetail!: Publicacion;

  constructor() {  }

  ngOnInit() {
  }

}
