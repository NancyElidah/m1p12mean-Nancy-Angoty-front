import { Component } from '@angular/core';
import { LayoutComponent } from '../../../menu-manager/layout/layout.component';
import { SidebarComponent } from '../../../menu-manager/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  imports: [LayoutComponent, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
