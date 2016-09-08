import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideForms, disableDeprecatedForms } from '@angular/forms';

import { AppComponent } from './app.component';
import { appRouterProviders } from './shared/app.routes';
import { AuthManager } from './shared/authmanager';

enableProdMode();

bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(),appRouterProviders,HTTP_PROVIDERS,AuthManager])
.catch(err => console.error(err));


