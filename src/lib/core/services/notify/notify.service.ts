import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, isObservable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}

  info(message: string, title?: string, options?: any): void {
    this.showMsg(message, 'Info: ');
  }

  success(message: string, title?: string, options?: any): void {
    this.showMsg(message, 'Success: ');
  }

  warn(message: string, title?: string, options?: any): void {
    this.showMsg(message, 'Warn: ');
  }

  error(message: string, title?: string, options?: any): void {
    this.showMsg(message, 'Error: ');
  }

  private showMsg(message: Observable<any> | string, type: string) {
    if (isObservable(message)) {
      message.subscribe(x => {
        this.snackBar.open(type + x, 'X', { duration: 5000 });
      });
    } else {
      this.snackBar.open(type + message, 'X', { duration: 5000 });
    }
  }
}
