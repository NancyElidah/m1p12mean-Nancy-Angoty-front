import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LoginClientComponent } from '../login-client/login-client.component';
import { FooterComponent } from '../footer/footer.component';
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
  title = 'Bienvenue dans GARAGE ';
  items: MenuItem[] = [];

  @ViewChild(LoginClientComponent) loginModal!: LoginClientComponent;

  ngOnInit() {
    this.items = [
      { label: 'Accueil', icon: 'pi pi-home' },
      { label: 'Tableau de bord', icon: 'pi pi-chart-bar' },
      { label: 'Atelier', icon: 'pi pi-wrench' },
      { label: 'Profil', icon: 'pi pi-user' },
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
}
