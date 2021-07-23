import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Tokens from '@app/tokens';
import { config } from '@app/config';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: Tokens.CONFIG,
    useValue: config,
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
