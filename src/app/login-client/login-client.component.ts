import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login-client',
  imports: [ButtonModule, FormsModule, DialogModule],
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.css',
})
export class LoginClientComponent {
  displayModal: boolean = false;
  email: string = '';
  password: string = '';

  showModal() {
    this.displayModal = true;
  }

  hideModal() {
    this.displayModal = false;
  }

  login() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
    this.hideModal();
  }
}
