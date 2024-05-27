import { Component } from '@angular/core';
import { CmEditorComponent } from '../../shared/cm-editor/cm-editor.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoggerService } from '@services/shared/logger/logger.service';
import _ from 'lodash';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from '@services/shared/snackbar/snackbar.service';
import { EditorText, TDiff } from '@models/core-models';
import { Router } from '@angular/router';
import { checkJSONDiff, sortJSON } from '@services/shared/utils';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

const DEFAULT_SPACES = 2;

@Component({
  selector: 'app-json-diff',
  standalone: true,
  imports: [CommonModule, CmEditorComponent, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatListModule],
  templateUrl: './json-diff.component.html',
  styleUrl: './json-diff.component.scss'
})
export class JsonDiffComponent {
  data1!: EditorText;
  data2!: EditorText;
  home = { name: 'Home', path: ['apps'] };
  spaces = 2;
  differences: any = [];



  constructor(private log: LoggerService, private _snackbar: SnackbarService, private router: Router) { }

  gotoHome = () => {
    this.router.navigate(this.home.path);
  }

  getDiffStyle(item: TDiff) {
    if (item.change) {
      return 'value-changed';
    }
    if (item.add) {
      return 'addition';
    }
    if (item.remove) {
      return 'removed';
    }
    if (item.incompatible) {
      return 'incompatible';
    }
    return '';
  }

  __getTextFromEditor = (data: EditorText) => {
    const text = _.get(data, 'text', []);
    const updatedStr = text.join('\n');
    const val = JSON.parse(updatedStr);
    return val;
  }

  _getEditorSetData = (data: object) => {
    return { text: JSON.stringify(data, null, this.spaces >= 1 ? this.spaces : DEFAULT_SPACES).split('\n'), new: true };
  }


  jsondiff = () => {
    const data1 = this.__getTextFromEditor(this.data1);
    const data2 = this.__getTextFromEditor(this.data2);
    this.differences = checkJSONDiff(data1, data2).filter(e => e.changed);
    this.log.debug(this.differences);
    this.data1 = this._getEditorSetData(sortJSON(data1));
    this.data2 = this._getEditorSetData(sortJSON(data2));
  }
}
