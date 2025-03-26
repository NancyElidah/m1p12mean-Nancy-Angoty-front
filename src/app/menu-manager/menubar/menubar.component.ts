import { Component, EventEmitter, Output } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar'; 

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  standalone: true,
  imports: [MenubarModule, InputTextModule, FormsModule, IconFieldModule, InputIconModule, AvatarModule]
})
export class MenubarComponent {
  menuItems: any[];
  searchQuery: string = ''; 
  constructor() {
    this.menuItems = [
    ];
  }
  @Output() toggleSidebar = new EventEmitter<void>();
  onToggleSidebar() {
    this.toggleSidebar.emit(); 
    console.log('tonga ato')
  }
  rechercher() {
    console.log('Recherche :', this.searchQuery);
  }
}
