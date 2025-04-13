import { Component } from '@angular/core';
import { HeaderComponent } from '../mec-manager/header/header/header.component';
import { PromotionService } from '../service/promotion.service';
import { PrestationService } from '../service/prestation.service';
import { Router } from '@angular/router';
import { Prestation } from '../models/Prestation';
import { Promotion } from '../models/Promotion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api'; 
import { ToastModule } from 'primeng/toast'; 
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-crud-promotion',
  imports: [HeaderComponent, ReactiveFormsModule, ScrollPanelModule, CommonModule, FormsModule, 
            ButtonModule, DropdownModule, DialogModule, ToastModule,ConfirmDialogModule],
  templateUrl: './crud-promotion.component.html',
  styleUrl: './crud-promotion.component.css',
  standalone: true,
  providers: [
    ConfirmationService, MessageService,  
    { provide: LOCALE_ID, useValue: 'fr' },
  ]
})

export class CrudPromotionComponent {
  formPromotion!: FormGroup;  
  totalPromotion: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 5;
  itemsPrestation: { label: String, value: any }[] = [];
  items : Promotion[] = [];
  displayedPromotion: Promotion[] = [];
  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private prestationService: PrestationService,
    private messageService: MessageService,
    private router: Router ,
    private confirmationService: ConfirmationService,
  ) {}

  showDialog() {
    this.visible = true; 
  }
  
  ngOnInit(): void {
    this.formPromotion = this.fb.group({
      intitule: ['', Validators.required],
      debut: ['', Validators.required],
      fin: ['', Validators.required],
      pourcentage: ['', Validators.required],
      idPrestation: ['', Validators.required]
    });
    this.getAllPrestation();
    this.getAllPromotions();
  }

  onSubmit() {
    const prestationTypeId = this.formPromotion.get('idPrestation')?.value;
    const prestationData = { ...this.formPromotion.value, idPrestation: prestationTypeId };
    this.promotionService.validateForm(prestationData).subscribe(
      (validationResponse) => {
        this.messageService.add({ severity: 'info', summary: 'Validation',
                              detail: validationResponse.message || 'Données valides.'});
        this.promotionService.addPromotion(prestationData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Succès',
                                    detail: 'Promotion enregistrée avec succès!'});
          this.visible = false;
          this.resetForm();
          this.getAllPromotions();
          this.router.navigate(['/promotions']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur de création', detail: error.message});
        }
      );},
      (validationError) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur de validation',
                                 detail: validationError.message});
      }
    );
  }

  getAllPrestation() {
    this.prestationService.getPrestationListe().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.itemsPrestation = data.map((prestation: Prestation) => ({label: prestation.intitule,
                                                                        value: prestation._id}));
        }else {
          console.error('La réponse n’est pas un tableau:', data);
          this.itemsPrestation = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des prestations:', error);
        this.messageService.add({ severity: 'error', summary: 'Récupération Prestation',
                                  detail: 'Erreur lors de la récupération des données.'});
      }
    );
  }
  
  getAllPromotions() {
    this.promotionService.getPromotions(this.currentPage, this.rowsPerPage).subscribe(
      (data) => { 
        this.items=[...data.promotion];
        this.totalPromotion=data.totalPromotion;
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

  resetForm() {
    this.formPromotion.reset(); 
  }

  paginateData() {
    if (this.items.length > 0) {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      this.displayedPromotion = this.items.slice(start, end);
    } else {
      this.displayedPromotion = []; 
    }
  }

  validerPromotion(id: string) {
    this.promotionService.validatePromotion(id, 5).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Succès',
                                  detail: 'Promotion validée avec succès.' });
        this.getAllPromotions();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.message });
      }
    });
  }
  
  retirerPromotion(id: string) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir retirer cette promotion ?',
      header: 'Confirmation de retrait',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui', 
      rejectLabel: 'Non', 
      accept: () => {
        this.closeDialog();
        this.promotionService.retirerPromotion(id).subscribe(
          (response) => {
            this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Promotion retirée.',});
            this.getAllPromotions();  
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
}

