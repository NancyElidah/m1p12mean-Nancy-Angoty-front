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
  taches_table: Tache[] = [];

  constructor(private tache_serivce: TacheService) {}
  ngOnInit() {
    this.filtreTache = new FormGroup({
      selectedCity: new FormControl(''),
      prix: new FormControl(''),
    });
    this.loadTache();
  }
  loadTache() {
    this.tache_serivce.getAll().subscribe(
      (response) => {
        console.log('Réponse API:', response); // 👈 Vérifie ici

        // Vérifie si response est un objet contenant `taches`
        if (response) {
          this.taches_table = response.map((tache: any) => ({
            id: tache._id,
            id_voiture: {
              _id: tache.id_voiture._id,
              immatriculation: tache.id_voiture.immatriculation,
            },
            date_attribution: new Date(tache.date_attribution),
            date_reparation: new Date(tache.date_reparation),
            id_mecanicien: {
              _id: tache.id_mecanicien._id,
              nom: tache.id_mecanicien.nom,
              prenom: tache.id_mecanicien.prenom,
              email: tache.id_mecanicien.email,
            },
            prix_total: tache.prix_total,
            details_rep: tache.details_rep.map((rep: any) => ({
              prestation: rep.prestation,
              quantite: rep.quantite,
              prix: rep.prix,
              prix_total: rep.prix_total,
              paye: rep.paye,
              details_pieces: rep.details_pieces.map((piece: any) => ({
                id_piece: piece.id_piece,
                quantite: piece.quantite,
                prix: piece.prix,
                prix_total: piece.prix_total,
              })),
            })),
          }));
        } else {
          console.error('Format de réponse inattendu:', response);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    );
  }

  showDialog() {}
}
