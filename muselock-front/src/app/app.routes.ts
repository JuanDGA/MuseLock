import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CargarImagenComponent } from './cargar-imagen/cargar-imagen.component';
import { FeedComponent } from './feed/feed.component';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent,
    title: 'Login | MuseLock'
},

{
    path: 'upload',
    component: CargarImagenComponent,
    title: 'Carga tu Obra | MuseLock'
},

{
    path: 'feed',
    component: FeedComponent,
    title: 'Explora | MuseLock'
},

{
    path: 'perfil',
    component: PerfilComponent,
    title: 'Tu Perfil | MuseLock'
}
];
