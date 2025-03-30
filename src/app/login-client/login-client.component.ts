import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { SnackbarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-login-client',
  imports: [ButtonModule, FormsModule, DialogModule, RouterLink, Toast],
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.css',
})
export class LoginClientComponent {
  /** Constructeur */
  constructor(
    private user_service: UserService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  /** Attribut */
  displayModal: boolean = false;
  email: string = '';
  password: string = '';

  /** Fonction */
  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
  }

  login() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);

    if (!this.email || !this.password) {
      this.snackbarService.open(
        'Veuillez entrer votre email et votre mot de passe.',
        'Champ(s) manquant(s)',
        'warn'
      );
      return;
    }

    const login = { email: this.email, password: this.password };

    this.user_service.login(login).subscribe({
      next: (response) => {
        if (response.auth) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email-client', response.user);
          localStorage.setItem('statut', response.role);
          localStorage.setItem('valid', response.valid);

          this.snackbarService.open(
            `Bon retour ${response.user} !`,
            'Connexion réussie',
            'success'
          );
          console.log(localStorage.getItem('token'));
          window.location.reload();
        } else {
          this.snackbarService.open(
            'Connexion refusée. Veuillez vérifier vos identifiants.',
            'Accès refusé',
            'error'
          );
        }
      },
      error: (error) => {
        console.error('Erreur de connexion :', error);
        this.snackbarService.open(
          'Une erreur est survenue. Veuillez réessayer.',
          'Connexion échouée',
          'error'
        );
      },
      complete: () => {
        this.hideModal();
      },
    });
  }
}
