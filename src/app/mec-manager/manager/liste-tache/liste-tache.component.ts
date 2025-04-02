import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../../service/tache.service';
import { Tache } from '../../../models/Tache';
import { TooltipModule } from 'primeng/tooltip';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-liste-tache',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    TooltipModule,
    MessageModule,
    DialogModule,
  ],
  templateUrl: './liste-tache.component.html',
  styleUrl: './liste-tache.component.css',
})
export class ListeTacheComponent implements OnInit {
  filtreTache!: FormGroup;
  taches_table: Tache[] = [];
  titre: string = '';
  activeTab: string = 'en-cours';
  formTache!: FormGroup;
  visible = false;

  constructor(private tache_serivce: TacheService, private fb: FormBuilder) {}
  ngOnInit() {
    this.filtreTache = this.fb.group({
      intitule: ['', Validators.required],
      prix: ['', Validators.required],
    });

    this.formTache = this.fb.group({
      voiture: ['', Validators.required],
      date_prevu: ['', Validators.required],
      mecanicien: ['', Validators.required],
      prestations: this.fb.array([]), // Ajoute un FormArray
    });

    this.loadTacheEnCour();
  }

  loadTacheEnAttente() {
    this.activeTab = 'en-attente';
    this.titre = 'Liste des tâches en attente';
    this.tache_serivce.getAllEnAttente().subscribe({
      next: (data: any) => {
        this.taches_table = Array.isArray(data.tache) ? data.tache : [];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches en attente', error);
        this.taches_table = [];
      },
    });
  }

  loadTacheEnCour() {
    this.activeTab = 'en-cours';
    this.titre = 'Liste des tâches en cours';
    this.tache_serivce.getAllEnCours().subscribe({
      next: (data: any) => {
        this.taches_table = Array.isArray(data.tache) ? data.tache : [];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches en cours', error);
        this.taches_table = [];
      },
    });
  }

  loadTacheTerminer() {
    this.activeTab = 'terminer';
    this.titre = 'Liste des tâches terminées';
    this.tache_serivce.getAllTerminer().subscribe({
      next: (data: any) => {
        this.taches_table = Array.isArray(data.tache) ? data.tache : [];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tâches terminées', error);
        this.taches_table = [];
      },
    });
  }

  showDialog() {
    this.visible = true;
  }
  resetForm() {
    this.formTache.reset();
  }
  fermerDialogue() {
    this.visible = false;
  }
  onSubmit() {}
  get prestations(): FormArray {
    return this.formTache.get('prestations') as FormArray;
  }

  // Ajouter une prestation
  addPrestation(): void {
    const prestationGroup = this.fb.group({
      nom: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
    });
    this.prestations.push(prestationGroup);
  }

  // Supprimer une prestation
  removePrestation(index: number): void {
    this.prestations.removeAt(index);
  }
}
