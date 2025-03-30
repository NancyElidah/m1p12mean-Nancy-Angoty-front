import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { PrestationService } from '../services/prestation.service';
import { SnackbarService } from '../services/snack-bar.service';
import { Propos } from '../models/Propos';
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
  imports: [ReactiveFormsModule, CommonModule, MessageModule,TableModule, ButtonModule, DialogModule, InputTextModule]

})
export class CrudPrestationComponent {
  formPropos!: FormGroup;  
  propos: Propos = new Propos();
  items: Propos[] = []; 
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
    this.formPropos = this.fb.group({
      intitule: ['', Validators.required],  
    });
  } 
  resetForm() {
    this.formPropos.reset(); 
  }
}
