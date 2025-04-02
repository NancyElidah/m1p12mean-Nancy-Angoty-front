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
import { TooltipModule } from 'primeng/tooltip';

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
  ],
  templateUrl: './liste-tache.component.html',
  styleUrl: './liste-tache.component.css',
})
export class ListeTacheComponent implements OnInit {
  filtreTache!: FormGroup;
  taches_table: Tache[] = [];
  titre: string = '';
  activeTab: string = 'en-cours';

  constructor(private tache_serivce: TacheService) {}
  ngOnInit() {
    this.filtreTache = new FormGroup({
      selectedCity: new FormControl(''),
      prix: new FormControl(''),
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
    // this.activeTab = 'terminer';
    // this.titre = 'Liste des tâches terminées';
    // this.tache_serivce.getTacheTerminer().subscribe({
    //   next: (data: any) => {
    //     this.taches_table = Array.isArray(data.tache) ? data.tache : [];
    //   },
    //   error: (error) => {
    //     console.error('Erreur lors du chargement des tâches terminées', error);
    //     this.taches_table = [];
    //   },
    // });
  }

  showDialog() {}
}
