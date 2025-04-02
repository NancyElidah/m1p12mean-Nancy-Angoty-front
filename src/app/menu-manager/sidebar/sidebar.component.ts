import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
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
          command: () => {
            this.router.navigate(['/dashboard']);
          },
        },
        {
          label: 'Analyses et rapports',
          command: () => {
            this.router.navigate(['/test']);
          },
        },
      ],
    },
    {
      label: 'Utilisateurs',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Validation des profils',
          command: () => {
            this.router.navigate(['/users/validate']);
          },
        },
        {
          label: 'Liste des utilisateurs',
          command: () => {
            this.router.navigate(['/users/list']);
          },
        },
      ],
    },
    {
      label: 'Réparations',
      icon: 'pi pi-wrench',
      items: [
        {
          label: 'Gestion des propos',
          command: () => {
            this.router.navigate(['/propos']);
          },
        },
        {
          label: 'Gestion des prestations',
          command: () => {
            this.router.navigate(['/prestations']);
          },
        },
        {
          label: 'Gestion des réparations',
          command: () => {
            this.router.navigate(['/reparations']);
          },
        },
      ],
    },
    {
      label: 'Abonnements',
      icon: 'pi pi-tags',
      items: [
        {
          label: 'Créer une offre',
          command: () => {
            this.router.navigate(['/subscriptions/create']);
          },
        },
        {
          label: 'Gérer les abonnements',
          icon: '',
          command: () => {
            this.router.navigate(['/subscriptions/manage']);
          },
        },
      ],
    },
  ];
}
