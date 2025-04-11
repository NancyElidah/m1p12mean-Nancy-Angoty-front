import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule} from '@angular/forms';
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
import { ToastModule } from 'primeng/toast'; 
import { MessageService, ConfirmationService } from 'primeng/api';  
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-crud-propos',
  templateUrl: './crud-propos.component.html',
  styleUrls: ['./crud-propos.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageModule,TableModule, ButtonModule, DialogModule, InputTextModule, HeaderComponent, ToastModule, ConfirmDialogModule, FormsModule],  
  providers: [ConfirmationService, MessageService]
})
export class CrudProposComponent implements OnInit {
  formPropos!: FormGroup;  
  items: Propos[] = []; 
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private proposService: ProposService,
    private snackbarService: SnackbarService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  propos: Propos = new Propos();
  props: Propos[] = [];
  displayedPropos: Propos[] = [];
  totalPropos: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [10, 50, 100];
  visible = false;
  showDialog() {
    this.visible = true; 
    console.log('dialog')
  }
  ngOnInit(): void {
  this.snackbarService.open('Test toast', 'Test', 'success');
  this.formPropos = this.fb.group({
    intitule: ['', Validators.required],
  });
  this.getAllPropos();
}
filterPropos() {
  const term = this.searchQuery.toLowerCase();
  this.displayedPropos = this.items.filter(p =>
    p.intitule.toLowerCase().includes(term)
  );
}
  
  getAllPropos() {
    this.proposService.getPropos(this.currentPage, this.rowsPerPage).subscribe(
      (data) => {
        console.log('Données reçues:', data);
        
        this.items = data.propos;
        this.props = [...this.items]; 
        this.totalPropos = data.totalPropos;
        this.paginateData(); 
      },
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
  
  paginateData() {
    if (this.props.length > 0) {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      this.displayedPropos = this.props.slice(start, end);
    } else {
      this.displayedPropos = []; 
    }
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1; 
    this.rowsPerPage = event.rows; 
    this.getAllPropos();
  }
  
  onSubmit() {
    this.propos = this.formPropos.value;
    this.proposService.validatePropos(this.propos).subscribe(
      (validationResponse) => {
        this.messageService.add({ severity: 'info', summary: 'Validation',
          detail: validationResponse.message || 'Données valides.'});
        this.proposService.addPropos(this.propos).subscribe(
          (response) => {
            this.messageService.add({ severity: 'success', summary: 'Succès',
                                      detail: 'Propos enregistrée avec succès!'});
            this.visible = false;
            this.resetForm();
            this.getAllPropos();
            this.router.navigate(['/propos']);
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
      message: 'Êtes-vous sûr de vouloir supprimer ce propos ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui', 
      rejectLabel: 'Non', 
      accept: () => {
        this.closeDialog();
        this.proposService.deletePropos(id).subscribe(
          (response) => {
            this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Propos supprimé avec succès.',});
            this.getAllPropos();  
          },
          (error) => {
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: error.message,});
          }
        );
      },
      reject: () => {
        this.closeDialog();
        this.messageService.add({severity: 'info',summary: 'Annulé',detail: 'Suppression annulée.',
        });

      },
    });
  }

  closeDialog() {
    this.confirmationService.close(); 
  }

  resetForm() {
    this.formPropos.reset(); 
  }
}
