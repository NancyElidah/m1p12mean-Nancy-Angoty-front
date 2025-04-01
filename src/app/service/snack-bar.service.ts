import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private messageService: MessageService) {}

  open(
    message: string,
    summary: string = 'Notification',
    severity: 'success' | 'info' | 'warn' | 'error' = 'info'
  ) {
    this.messageService.add({
      severity,
      summary,
      detail: message,
      life: 3000,
    });
  }
}
