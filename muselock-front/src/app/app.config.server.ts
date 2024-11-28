import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {provideAuth0} from "@auth0/auth0-angular";

const serverConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: 'muselock.us.auth0.com',
      clientId: 'V1eXAdHVXP8H7YdYGmWgxtSFATF9G30K',
      authorizationParams: {
        audience: 'https://muselock/',
        redirect_uri: window.location.origin
      }
    }),
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
