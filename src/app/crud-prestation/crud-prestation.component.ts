import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrestationService } from '../service/prestation.service';
import { SnackbarService } from '../service/snack-bar.service';
import { Prestation } from '../models/Prestation';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-crud-prestation',
  templateUrl: './crud-prestation.component.html',
  styleUrl: './crud-prestation.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MessageModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
  ],
})
export class CrudPrestationComponent {
  formPrestation!: FormGroup;
  propos: Prestation = new Prestation();
  items: Prestation[] = [];
  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.formPrestation = this.fb.group({
      intitule: ['', Validators.required],
      prix: ['', Validators.required],
    });
    this.getAllPropos();
  }

  getAllPropos() {
    this.prestationService.getPrestation().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        this.snackbarService.open(
          'Erreur lors de la récupération des données.',
          'Récupération Prestation',
          'error'
        );
      }
    );
  }
  onSubmit() {
    if (this.formPrestation.valid) {
      this.propos = this.formPrestation.value;
      this.prestationService.addPrestation(this.propos).subscribe(
        (response) => {
          this.snackbarService.open(
            'Prestation enregistré avec succès!',
            'Enregistrement Prestation',
            'success'
          );
          this.resetForm();
          this.getAllPropos();
          this.router.navigate(['/prestation']);
        },
        (error) => {
          console.error('Erreur lors de l’enregistrement :', error);
          this.snackbarService.open(
            'Une erreur est survenue. Veuillez réessayer.',
            'Enregistrement Prestation',
            'error'
          );
        }
      );
    }
  }

  resetForm() {
    this.formPrestation.reset();
  }
}
