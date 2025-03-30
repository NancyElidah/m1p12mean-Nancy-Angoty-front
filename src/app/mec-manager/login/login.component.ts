import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../service/snack-bar.service';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    ButtonModule,
    RouterLink,
    Toast,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user_service: UserService,
    private snackBar_service: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login Data:', loginData.email);
      console.log('Login Data:', loginData.password);
      const login = {
        email: loginData.email,
        password: loginData.password,
      };
      this.user_service.login(login).subscribe(
        (response) => {
          if (response.auth) {
            const accessToken = response.token;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('username', response.user);
            localStorage.setItem('role', response.role);
            localStorage.setItem('valid', response.valid);
            if (
              (localStorage.getItem('role') == '10' &&
                localStorage.getItem('valid') == '1') ||
              localStorage.getItem('role') == '0'
            ) {
              this.snackBar_service.open(
                'Bon retour ' + response.user,
                'Connexion réussie',
                'success'
              );
              this.router.navigate(['/accueil']);
            } else {
              this.snackBar_service.open(
                'Votre compte est en attente de validation ' + response.user,
                'Attente de validation',
                'warn'
              );
            }
          }
        },
        (error) => {
          this.snackBar_service.open(
            'Échec de la connexion. Veuillez vérifier vos identifiants. ',
            'Connexion échouée',
            'error'
          );
        }
      );
    }
  }
}
