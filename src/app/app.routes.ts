import { Routes } from '@angular/router';
import { HeaderClientComponent } from './header-client/header-client.component';
import { LoginClientComponent } from './login-client/login-client.component';

export const routes: Routes = [
  { path: '', component: HeaderClientComponent },
  { path: 'login-client', component: LoginClientComponent },
];
