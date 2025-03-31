import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../../service/tache.service';
import { Tache } from '../../../models/Tache';

@Component({
  selector: 'app-liste-tache',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './liste-tache.component.html',
  styleUrl: './liste-tache.component.css',
})
export class ListeTacheComponent implements OnInit {
  filtreTache!: FormGroup;
  taches: Tache[] = [];

  constructor(private tache_serivce: TacheService) {}
  ngOnInit() {
    this.filtreTache = new FormGroup({
      selectedCity: new FormControl(''),
      prix: new FormControl(''),
    });
  }
  loadTache() {
    this.tache_serivce.getAll().subscribe(
      (response) => {
        this.taches = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des pièces:', error);
      }
    );
  }
  showDialog() {}
}
