import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoggerService } from '../logger/logger.service';


type Panel = {
  [k: string]: string
};
const panels: Panel = {
  error: 'snack-bar-error',
  warn: 'snack-bar-warn',
  info: 'snack-bar-info',
  success: 'snack-bar-success'
};

type TPanelType = keyof Panel;

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackbar: MatSnackBar, private log: LoggerService) { }
  open(msg: string, type: TPanelType = 'success') {
    const panel = panels[type];
    this.log.info(`Setting panel - ${panel}`);
    this._snackbar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: panel
    });
  }
}
