import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LoginClientComponent } from '../login-client/login-client.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
LoginClientComponent;
@Component({
  selector: 'app-header-client',
  imports: [
    FormsModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    LoginClientComponent,
    FooterComponent,
  ],
  templateUrl: './header-client.component.html',
  styleUrl: './header-client.component.css',
})
export class HeaderClientComponent implements AfterViewInit {
  constructor(private router: Router) {}
  title = 'Bienvenue dans GARAGE ';
  items: MenuItem[] = [];

  @ViewChild(LoginClientComponent) loginModal!: LoginClientComponent;

  ngOnInit() {
    const isLoggedIn = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('statut');

    this.items = [
      { label: 'Accueil', icon: 'pi pi-home', routerLink: ['/'] },
      {
        label: 'Tableau de bord',
        icon: 'pi pi-chart-bar',
        routerLink: ['/dashboard'],
        disabled: !isLoggedIn,
      },
      {
        label: 'Atelier',
        icon: 'pi pi-wrench',
        routerLink: ['/atelier'],
        disabled: !isLoggedIn || userRole !== '20',
      },
      {
        label: localStorage.getItem('email-client') || 'Profil',
        icon: 'pi pi-user',
        routerLink: ['/profil'],
        disabled: !this.isLoggedIn(),
      },
    ];
  }

  ngAfterViewInit() {
    if (this.loginModal) {
      console.log('Login modal is ready');
    }
  }

  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.showModal();
    } else {
      console.error('Login modal is not available yet!');
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email-client');
    localStorage.removeItem('statut');
    localStorage.removeItem('valid');
    localStorage.clear();
    location.reload();
    this.router.navigate(['/']);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
