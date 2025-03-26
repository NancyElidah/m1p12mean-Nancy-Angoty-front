import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenubarComponent } from '../menubar/menubar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [SidebarComponent, MenubarComponent]
})
export class LayoutComponent {}
