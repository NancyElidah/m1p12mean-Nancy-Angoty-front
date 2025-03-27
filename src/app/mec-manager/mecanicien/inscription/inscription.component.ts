import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/User';
import { SnackbarService } from '../../../service/snack-bar.service';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, ReactiveFormsModule, TabViewModule, ButtonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent implements OnInit {
  formIns!: FormGroup;
  newMec: User = new User();
  statut = 10;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formIns = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: [''],
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  onLogin() {}
  onRegister() {
    if (this.formIns.valid) {
      this.newMec = this.formIns.value;
      this.newMec.statut = this.statut;
      this.user.addClient(this.newMec).subscribe(
        (response) => {
          this.snackbarService.open(
            'mécanicien enregistré avec succès !',
            'Enregistrement mécanicien',
            'success'
          );
        },

        (error) => {
          console.error('Erreur lors de l’enregistrement :', error);
          this.snackbarService.open(
            'Une erreur est survenue. Veuillez réessayer.',
            'Enregistrement mécanicien',
            'error'
          );
        }
      );
    }
  }
}
