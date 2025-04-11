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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';  
import { ToastModule } from 'primeng/toast'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-prestation',
  templateUrl: './crud-prestation.component.html',
  styleUrls: ['./crud-prestation.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModule, TableModule, ButtonModule, 
            DialogModule, InputTextModule, HeaderComponent, DropdownModule, ConfirmDialogModule, 
            ToastModule, FormsModule],
  providers: [ConfirmationService, MessageService]
})

export class CrudPrestationComponent {
  formPrestation!: FormGroup;  
  propos: Prestation = new Prestation();
  items: Prestation[] = []; 
  totalPrestation: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 5;
  itemsPropos: { label: String, value: any }[] = [];
  rowsPerPageOptions: number[] = [10, 50, 100];
  displayedPrestation: Prestation[] = [];

  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService,
    private proposService: ProposService,
    private snackbarService: SnackbarService,
    private router: Router ,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  visible: boolean = false;
  searchQuery: string = '';

  showDialog() {
    this.visible = true; 
  }
  
  ngOnInit(): void {
    this.formPrestation = this.fb.group({
      intitule: ['', Validators.required],  
      prix: ['', Validators.required],
      prestationType: ['', Validators.required] 
    });
    this.getAllPropos();
    this.getAllPrestations();
  }

  getAllPrestations() {
    this.prestationService.getPrestation(this.currentPage, this.rowsPerPage).subscribe(
      (data) => { 
        this.items=[...data.prestation];
        this.totalPrestation=data.totalPrestation;
        this.paginateData();
        // console.log('Données reçues:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        this.messageService.add({ severity: 'error', summary: 'Récupération Prestations', 
                                  detail: 'Erreur lors de la récupération des données.'});
      }
    );
  }

  getAllPropos() {
    this.proposService.getProposListe().subscribe(
      (data) => {
        this.itemsPropos = data.map((propos: Propos) => ({ label: propos.intitule, value: propos._id}));
      },
      (error) => {
        console.error('Erreur lors de la récupération des propos:', error);
        this.messageService.add({ severity: 'error', summary: 'Récupération Propos', 
                                  detail: 'Erreur lors de la récupération des données.'});
      }
    );
  }
  
  onSubmit() {
    const prestationTypeId = this.formPrestation.get('prestationType')?.value;
    const prestationData = { ...this.formPrestation.value, prestationType: prestationTypeId };
    this.prestationService.validatePrestation(prestationData).subscribe(
      (validationResponse) => {
        this.messageService.add({ severity: 'info', summary: 'Validation',
                              detail: validationResponse.message || 'Données valides.'});
        this.prestationService.addPrestation(prestationData).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Succès',
                                      detail: 'Prestation enregistrée avec succès!'});
            this.visible = false;
            this.resetForm();
            this.getAllPrestations();
            this.router.navigate(['/prestations']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erreur de création', detail: error.message});
          }
        );
      },
      (validationError) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur de validation',
                                 detail: validationError.message});
      }
    );
  }
  
  
  confirmAction(id: string) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette prestation ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui', 
      rejectLabel: 'Non', 
      accept: () => {
        this.closeDialog();
        this.prestationService.deletePrestation(id).subscribe(
          (response) => {
            this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Prestation supprimée avec succès.',});
            this.getAllPrestations();  
          },
          (error) => {
            this.messageService.add({severity: 'error',summary: 'Erreur', detail: error.message,});
          }
        );
      },
      reject: () => {
        this.closeDialog();
        this.messageService.add({severity: 'info',summary: 'Annulé',detail: 'Suppression annulée.',});
      },
    });
  }
  closeDialog() {
    this.confirmationService.close(); 
  }

  paginateData() {
    if (this.items.length > 0) {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      this.displayedPrestation = this.items.slice(start, end);
    } else {
      this.displayedPrestation = []; 
    }
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1; 
    this.rowsPerPage = event.rows; 
    this.getAllPropos();
  }
  resetForm() {
    this.formPrestation.reset(); 
  }

  filterPrestations() {
    const term = this.searchQuery.toLowerCase();
    this.displayedPrestation = this.items.filter(prestation =>
      prestation.intitule.toLowerCase().includes(term) ||
      prestation.prestationType?.intitule?.toLowerCase().includes(term)
    );
  }
}
