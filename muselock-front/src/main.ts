import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAuth0} from '@auth0/auth0-angular';

  bootstrapApplication(AppComponent,
    {
      providers: [
        provideRouter(routes),
        ...appConfig.providers,
        provideAuth0({
          domain: 'dev-4f4zq7bkzbdp4x4h.us.auth0.com',
          clientId: '0nevWKU03cWQ0P61XJOx4nyWIsksSkMP',
          authorizationParams: {
            redirect_uri: window.location.origin
          }
        })
      ]
    }
  ).catch(err => console.error(err));