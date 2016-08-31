import {bootstrap} from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import {AppComponent} from './app.component'
import {enableProdMode} from '@angular/core';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {appRouterProviders} from './shared/app.routes';
import {AuthManager} from './shared/authmanager';

enableProdMode();

bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(),appRouterProviders,HTTP_PROVIDERS,AuthManager])
.catch(err => console.error(err));