import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PrestationService } from '../service/prestation.service';
import { ProposService } from '../service/propos.service';
import { SnackbarService } from '../service/snack-bar.service';
import { Prestation } from '../models/Prestation';
import { Propos } from '../models/Propos';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from '../mec-manager/header/header/header.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-crud-prestation',
  templateUrl: './crud-prestation.component.html',
  styleUrls: ['./crud-prestation.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModule, TableModule, ButtonModule, DialogModule, InputTextModule, HeaderComponent, DropdownModule]
})
export class CrudPrestationComponent {
  formPrestation!: FormGroup;  
  propos: Prestation = new Prestation();
  items: Prestation[] = []; 
  itemsPropos: { label: String, value: any }[] = [];

  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService,
    private proposService: ProposService,
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
      prestationType: ['', Validators.required]  // Ajout du contrôle pour la liste déroulante
    });
    this.getAllPrestations();
  }
  getAllPrestations() {
    this.prestationService.getPrestation().subscribe(
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
  getAllPropos() {
    this.proposService.getPropos().subscribe(
      (data) => {
        this.itemsPropos = data.map((propos: Propos) => ({
          label: propos.intitule,  // Affiche l'intitulé de la prestation
          value: propos._id    // Utilise l'ID du propos (qui sera l'ID à enregistrer)
        }));
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
      // Récupérer la valeur sélectionnée dans le p-dropdown (ID du propos)
      const prestationTypeId = this.formPrestation.get('prestationType')?.value;
      console.log("ID sélectionné dans le dropdown:", prestationTypeId);
  
      // Préparer l'objet de données à envoyer
      const prestationData = {
        ...this.formPrestation.value,  // Inclut les autres champs du formulaire
        prestationType: prestationTypeId  // Ajoute l'ID de la prestation sélectionnée
      };

      // Appel au service pour enregistrer la prestation
      this.prestationService.addPrestation(prestationData).subscribe(
        (response) => {
          this.snackbarService.open(
            'Prestation enregistrée avec succès!',
            'Enregistrement Prestation',
            'success'
          );
          this.resetForm(); 
          this.getAllPrestations(); // Rafraîchir la liste des propos
          this.router.navigate(['/prestations']);
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
