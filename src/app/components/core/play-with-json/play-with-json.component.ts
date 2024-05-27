import { Component } from '@angular/core';
import { CmEditorComponent } from '../../shared/cm-editor/cm-editor.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoggerService } from '@services/shared/logger/logger.service';
import _ from 'lodash';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from '@services/shared/snackbar/snackbar.service';
import { EditorText, TApp } from '@models/core-models';
import { Router } from '@angular/router';
import { sortJSON } from '@services/shared/jsondiff';
const DEFAULT_SPACES = 2;

@Component({
  selector: 'app-play-with-json',
  standalone: true,
  imports: [CmEditorComponent, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  providers: [LoggerService],
  templateUrl: './play-with-json.component.html',
  styleUrl: './play-with-json.component.scss'
})
export class PlayWithJsonComponent {
  unrefined = '';
  refined = '';
  formatted = '';
  data1!: EditorText;
  data2!: EditorText;
  spaces = DEFAULT_SPACES;
  home = {name: 'Home', path: ['apps']};

  constructor(private log: LoggerService, private _snackbar: SnackbarService, private router: Router) { }

  gotoHome = () => {
    this.router.navigate(this.home.path);
  }
  format = () => {
    const data = this.__getTextFromEditor(this.data1);
    this._setNextEditor(data);
  }

  handle(action: string) {
    try {
      switch (action) {
        case 'format': {
          this.format();
          break;
        }
        case 'unescape': {
          this.unescape();
          break;
        }
        case 'sort': {
          this.sortIt();
          break;
        }
        default: {
          this._snackbar.open('Invalid action', 'error');
          break;
        }
      }
    } catch (error) {
      this.log.error(`Error while parsing data`, error, this.data1);
      this._snackbar.open('Invalid JSON', 'error');
    }
  }

  __getTextFromEditor = (data: EditorText, plain = false) => {
    const text = _.get(data, 'text', []);
    const updatedStr = text.join('\n');
    if (plain) {
      return updatedStr;
    }
    const val = JSON.parse(updatedStr);
    return val;
  }

  _setNextEditor = (data: object) => {
    this.data2 = { text: JSON.stringify(data, null, this.spaces >= 1 ? this.spaces : DEFAULT_SPACES).split('\n'), new: true };
    this.log.info('New data set', this.data2);
  }

  unescape = () => {
    let jsonString = this.__getTextFromEditor(this.data1, true);
    jsonString = `"${jsonString}"`;
    const dataStr = JSON.parse(jsonString);
    this.log.info('Unescape successfull, parsing data to json');
    const data = JSON.parse(dataStr);
    this._setNextEditor(data);
  }

  dataSort = (o: object) => {
    let result = {};
    let keys = Object.keys(o);
    keys = _.sortBy(keys, (e) => e);
    for (let key of keys) {
      const val = _.get(o, key);
      if (typeof val === 'object' && !Array.isArray(val) && !_.isEmpty(val)) {
        const sortedValue = this.dataSort(val);
        _.set(result, key, sortedValue);
        continue;
      }
      _.set(result, key, val);
    }
    return result;
  }

  sortIt = () => {
    const data = this.__getTextFromEditor(this.data1);
    const sortedValue = sortJSON(data);
    this._setNextEditor(sortedValue);
  }

}
