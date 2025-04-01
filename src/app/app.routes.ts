import { Routes } from '@angular/router';
import { HeaderClientComponent } from './header-client/header-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { UtilisateurCrudClientComponent } from './utilisateur-crud-client/utilisateur-crud-client.component';
import { LoginComponent } from './mec-manager/login/login.component';
import { AccueilComponent } from './mec-manager/header/accueil/accueil.component';
import { InscriptionComponent } from './mec-manager/mecanicien/inscription/inscription.component';

export const routes: Routes = [
  { path: '', component: HeaderClientComponent },
  { path: 'login-client', component: LoginClientComponent },
  { path: 'inscription-client', component: UtilisateurCrudClientComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'inscription-mec', component: InscriptionComponent },
];
