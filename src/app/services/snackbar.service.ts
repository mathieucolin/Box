import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

action = true;
setAutoHide = true;
autoHide = 2000;
horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

constructor(public snackbar: MatSnackBar, private zone: NgZone) { }

open(message, actionButtonLabel) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.zone.run(() => {
        this.snackbar.open(message, this.action ? actionButtonLabel : undefined, config);
    });
  }
}
