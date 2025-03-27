import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderClientComponent } from '../header-client/header-client.component';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../service/user.service';
import { User } from '../models/User';
import { SnackbarService } from '../service/snack-bar.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-utilisateur-crud-client',
  imports: [FormsModule, HeaderClientComponent, ButtonModule, Toast],
  templateUrl: './utilisateur-crud-client.component.html',
  styleUrl: './utilisateur-crud-client.component.css',
})
export class UtilisateurCrudClientComponent {
  constructor(
    private user_service: UserService,
    private snackbarService: SnackbarService
  ) {}
  contact: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  statut: Number = 0;
  user: User = new User();

  /** insertion client */
  saveUser() {
    if (!this.nom || !this.prenom || !this.email || !this.password) {
      this.snackbarService.open('Veuillez remplir tous les champs.', 'error');
      return;
    }
    this.statut = 20;
    this.user = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      telephone: this.contact,
      statut: this.statut,
    };

    this.user_service.addClient(this.user).subscribe(
      (response) => {
        this.snackbarService.open(
          'Utilisateur enregistré avec succès !',
          'Enregistrement Utilisateur',
          'success'
        );
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l’enregistrement :', error);
        this.snackbarService.open(
          'Une erreur est survenue. Veuillez réessayer.',
          'Enregistrement Utilisateur',
          'error'
        );
      }
    );
  }

  resetForm() {
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.password = '';
    this.contact = '';
    this.statut = 0;
  }
}
