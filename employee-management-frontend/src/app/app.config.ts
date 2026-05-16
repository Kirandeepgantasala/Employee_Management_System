import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core'; // <-- Add LOCALE_ID
import { registerLocaleData } from '@angular/common'; // <-- Add this
import localeIn from '@angular/common/locales/en-IN';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes),
    provideHttpClient(
    withInterceptors([authInterceptor]),
   
  ),
  { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
  
 
 
};
