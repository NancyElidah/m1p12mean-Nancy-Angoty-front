import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Piece } from '../models/Piece';
import { PieceService } from '../service/piece.service';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../service/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-piece',
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    MessageModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './crud-piece.component.html',
  styleUrl: './crud-piece.component.css',
})
export class CrudPieceComponent implements OnInit {
  constructor(
    private pieceService: PieceService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  pieces: Piece[] = [];
  displayedPieces: Piece[] = [];
  totalPieces: number = 0;
  currentPage: number = 1;
  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [10, 50, 100];
  formPiece!: FormGroup;
  visible = false;
  piece: Piece = new Piece();
  token = localStorage.getItem('token');

  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.formPiece = this.fb.group({
      intitule: ['', Validators.required],
      prix: ['', Validators.required],
    });
    this.loadPieces();
  }

  loadPieces() {
    this.pieceService.getAll().subscribe(
      (response) => {
        this.pieces = response;
        this.totalPieces = this.pieces.length;
        this.paginateData();
      },
      (error) => {
        console.error('Erreur lors du chargement des pièces:', error);
      }
    );
  }

  paginateData() {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.displayedPieces = this.pieces.slice(start, end);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.rowsPerPage = event.rows;
    this.paginateData();
  }

  onSubmit() {
    if (this.formPiece.valid && this.token) {
      console.log(this.token);
      this.piece = this.formPiece.value;
      this.pieceService.addPiece(this.piece).subscribe(
        (response) => {
          this.snackbarService.open(
            'Pièce enregistré avec succès!',
            'Enregistrement Pièce',
            'success'
          );
          this.resetForm();
          this.fermerDialogue();
          this.loadPieces();
          this.router.navigate(['/piece']);
        },
        (error) => {
          console.error('Erreur lors de l’enregistrement :', error);
          this.snackbarService.open(
            'Une erreur est survenue. Veuillez réessayer.' + error,
            'Enregistrement Pièce',
            'error'
          );
        }
      );
    } else {
      console.log('tsy misy token');
    }
  }

  resetForm() {
    this.formPiece.reset();
  }
  fermerDialogue() {
    this.visible = false;
  }
}
