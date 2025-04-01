import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';  
>>>>>>> develop

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [PanelMenuModule, CommonModule],
})
export class SidebarComponent {
  isCollapsed = false;
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  items: any[];
  constructor() {
    this.items = [
      {
        label: 'GARAGE KELY',
        icon: '',
        command: () => {
          console.log('Dashboard clicked');
        },
      },
      {
        label: 'Tableau de bord',
        icon: 'pi pi-home',
        items: [
          {
            label: "Chiffre d'affaires",
            icon: '',
            command: () => {
              console.log('Revenue clicked');
            },
          } /*pi pi-chart-bar*/,
          {
            label: 'Analyses et rapports',
            icon: '',
            command: () => {
              console.log('Reports clicked');
            },
          } /*pi pi-chart-line*/,
        ],
      },
      {
        label: 'Utilisateurs',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Inscription',
            icon: '',
            command: () => {
              console.log('Inscription clicked');
            },
          } /*pi pi-plus*/,
          {
            label: 'Validation des profils',
            icon: '',
            command: () => {
              console.log('Validation clicked');
            },
          } /*pi pi-check*/,
          {
            label: 'Liste des utilisateurs',
            icon: '',
            command: () => {
              console.log('Users list clicked');
            },
          } /**pi pi-list */,
        ],
      },
      {
        label: 'Réparations',
        icon: 'pi pi-wrench',
        items: [
          {
            label: 'Propositions de réparations',
            icon: '',
            command: () => {
              console.log('Propositions clicked');
            },
          } /*pi pi-wrench*/,
          {
            label: 'Gestion des réparations',
            icon: '',
            command: () => {
              console.log('Repairs management clicked');
            },
          } /*pi pi-cogs*/,
        ],
      },
      {
        label: 'Abonnements',
        icon: 'pi pi-tags',
        items: [
          {
            label: 'Créer une offre',
            icon: '',
            command: () => {
              console.log('Create offer clicked');
            },
          } /*pi pi-pencil*/,
          {
            label: 'Gérer les abonnements',
            icon: '',
            command: () => {
              console.log('Manage subscriptions clicked');
            },
          } /*pi pi-cogs*/,
        ],
      },
      {
        label: 'Pièces',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Gestion des pièces',
            icon: '',
            command: () => {
              console.log('Manage parts clicked');
            },
          } /*pi pi-screwdriver-wrench  ou cogs*/,
          {
            label: 'Entrées/Sorties des pièces',
            icon: '',
            command: () => {
              console.log('Parts in-out clicked');
            },
          } /**pi pi-exchange' */,
        ],
      },
      {
        label: 'Mécaniciens',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Gestion des mécaniciens',
            icon: '',
            command: () => {
              console.log('Manage mechanics clicked');
            },
          } /*pi pi-cogs*/,
          {
            label: 'Attribuer des tâches',
            icon: '',
            command: () => {
              console.log('Assign tasks clicked');
            },
          } /*pi pi-tasks*/,
        ],
      },
      {
        label: 'Facturation',
        icon: 'pi pi-money-bill',
        items: [
          {
            label: 'Suivi des factures',
            icon: '',
            command: () => {
              console.log('Invoice tracking clicked');
            },
          } /*pi pi-file*/,
          {
            label: 'Gestion des paiements',
            icon: '',
            command: () => {
              console.log('Payment management clicked');
            },
          } /*pi pi-credit-card*/,
        ],
      },
      {
        label: 'Promotions',
        icon: 'pi pi-gift',
        items: [
          {
            label: 'Créer une promotion',
            icon: '',
            command: () => {
              console.log('Create promotion clicked');
            },
          } /*pi pi-tags*/,
          {
            label: 'Gérer les promotions',
            icon: '',
            command: () => {
              console.log('Manage promotions clicked');
            },
          } /*pi pi-cogs*/,
        ],
      },

      {
        label: 'Calendrier',
        icon: 'pi pi-calendar',
        items: [
          {
            label: 'Rendez-vous',
            icon: '',
            command: () => {
              console.log('Appointments clicked');
            },
          } /*pi pi-calendar-plus*/,
          {
            label: 'Suivi des interventions',
            icon: '',
            command: () => {
              console.log('Task follow-up clicked');
            },
          } /*pi pi-calendar-check*/,
        ],
      },
    ];
  }
=======
  imports: [PanelMenuModule, CommonModule] 
})
export class SidebarComponent {
  isCollapsed = false; 
  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  items: any[] = [
    {
      label: 'GARAGE KELY',
      icon: '',
      command: () => { console.log('Dashboard clicked'); }
    },
    {
      label: 'Tableau de bord',
      icon: 'pi pi-home',
      items: [{ label: 'Chiffre d\'affaires',  command: () => { this.router.navigate(['/dashboard']); }},
              { label: 'Analyses et rapports',  command: () => { this.router.navigate(['/test']); }}
            ]
    },
    {
      label: 'Utilisateurs',
      icon: 'pi pi-users',
      items: [
              { label: 'Validation des profils',command: () => { this.router.navigate(['/users/validate']); }},
              { label: 'Liste des utilisateurs', command: () => { this.router.navigate(['/users/list']); }}
          ]
    },
    {
      label: 'Réparations',
      icon: 'pi pi-wrench',
      items: [ { label: 'Gestion des propos', command: () => { this.router.navigate(['/propos']); }},
                { label: 'Gestion des prestations', command: () => { this.router.navigate(['/prestations']) }},
                { label: 'Gestion des réparations', command: () => { this.router.navigate(['/reparations']); }}
              ]
    },
    {
      label: 'Abonnements',
      icon: 'pi pi-tags',
      items: [{ label: 'Créer une offre', command: () => { this.router.navigate(['/subscriptions/create']); }},
              { label: 'Gérer les abonnements', icon: '', command: () => { this.router.navigate(['/subscriptions/manage']); } }
      ]
    },
  ];
>>>>>>> develop
}
