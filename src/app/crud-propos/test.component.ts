import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProposService } from '../services/propos.service';
import { SnackbarService } from '../services/snack-bar.service';
import { Propos } from '../models/Propos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-crud-propos',
  templateUrl: './test.component.html',
  styleUrls: ['./crud-propos.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModule],  // Importer ReactiveFormsModule ici
})
export class TestComponent implements OnInit {
  formPropos!: FormGroup;  
  propos: Propos = new Propos();
  constructor(
    private fb: FormBuilder,
    private proposService: ProposService,
    private snackbarService: SnackbarService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.formPropos = this.fb.group({
      intitule: ['', Validators.required],  
    });
  }

  onSubmit() {
    if (this.formPropos.valid) {
      this.propos = this.formPropos.value;
      this.proposService.addPropos(this.propos).subscribe(
        (response) => {
          this.snackbarService.open(
            'Propos enregistré avec succès!',
            'Enregistrement Propos',
            'success'
          );
          this.resetForm(); 
          this.router.navigate(['/propos']);  
        },
        (error) => {
          console.error('Erreur lors de l’enregistrement :', error);
          this.snackbarService.open(
            'Une erreur est survenue. Veuillez réessayer.',
            'Enregistrement Propos',
            'error'
          );
        }
      );
    }
  }

  resetForm() {
    this.formPropos.reset();  // Réinitialiser le formulaire
  }
}
