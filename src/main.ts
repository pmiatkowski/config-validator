import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Tokens from '@app/tokens';
import { readConfigs, defaultConfigMap, defaultConfigProcessor } from '@app/config';

if (environment.production) {
  enableProdMode();
}



(async function initApplication() {
/** Agregated config maps */
const configsMap = {
  ...defaultConfigMap,
}

const configs = await readConfigs(configsMap);
console.warn('WHAT ARE CONFIGS:', configs)
platformBrowserDynamic([
  {
    provide: Tokens.CONFIG,
    useValue: defaultConfigProcessor(configs.defaultConfig),
  }
]).bootstrapModule(AppModule).catch(err => console.error(err));
})()



