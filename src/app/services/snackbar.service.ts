import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    public snackbar: MatSnackBar,
    private zone: NgZone,
  ) { }

  error(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    this.zone.run(() => {
      this.snackbar.open(message, 'truc', config);
    });
  }

}
