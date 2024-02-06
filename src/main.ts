import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import routeConfig from './app/app.routes'

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig),
      provideAnimations()
    ]
  }
).catch(err => console.error(err));
