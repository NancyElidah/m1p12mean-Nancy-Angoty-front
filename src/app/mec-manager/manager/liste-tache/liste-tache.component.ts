import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-tache',
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './liste-tache.component.html',
  styleUrl: './liste-tache.component.css',
})
export class ListeTacheComponent implements OnInit {
  filtreTache!: FormGroup;
  ngOnInit() {
    this.filtreTache = new FormGroup({
      selectedCity: new FormControl(''),
      prix: new FormControl(''),
    });
  }
  showDialog() {}
}
