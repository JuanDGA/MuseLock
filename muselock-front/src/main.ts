import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAuth0} from '@auth0/auth0-angular';

  bootstrapApplication(AppComponent,
    {
      providers: [
        provideAuth0({
          domain: 'muselock.us.auth0.com',
          clientId: 'V1eXAdHVXP8H7YdYGmWgxtSFATF9G30K',
          authorizationParams: {
            audience: 'https://muselock/',
            redirect_uri: window.location.origin
          }
        }),
        ...appConfig.providers,
      ]
    }
  ).catch(err => console.error(err));
