import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProposService } from '../service/propos.service';
import { SnackbarService } from '../service/snack-bar.service';
import { Propos } from '../models/Propos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from '../mec-manager/header/header/header.component';


@Component({
  selector: 'app-crud-propos',
  templateUrl: './crud-propos.component.html',
  styleUrls: ['./crud-propos.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModule,TableModule, ButtonModule, DialogModule, InputTextModule, HeaderComponent],  // Importer ReactiveFormsModule ici
})
export class CrudProposComponent implements OnInit {
  formPropos!: FormGroup;  
  propos: Propos = new Propos();
  items: Propos[] = []; 
  constructor(
    private fb: FormBuilder,
    private proposService: ProposService,
    private snackbarService: SnackbarService,
    private router: Router 
  ) {}
  visible: boolean = false;
  showDialog() {
    this.visible = true; 
  }
  ngOnInit(): void {
    this.formPropos = this.fb.group({
      intitule: ['', Validators.required],  
    });
    this.getAllPropos();
  }
  
  getAllPropos() {
    this.proposService.getPropos().subscribe(
      (data) => {this.items = data;  },
      (error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        this.snackbarService.open(
          'Erreur lors de la récupération des données.',
          'Récupération Propos',
          'error'
        );
      }
    );
  }
  onSubmit() {
    if (this.formPropos.valid) {
      console.log('metyyyy')
      this.propos = this.formPropos.value;
      this.proposService.addPropos(this.propos).subscribe(
        (response) => {
          this.snackbarService.open(
            'Propos enregistré avec succès!',
            'Enregistrement Propos',
            'success'
          );
          this.resetForm(); 
          this.getAllPropos();
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
    this.formPropos.reset(); 
  }
}
