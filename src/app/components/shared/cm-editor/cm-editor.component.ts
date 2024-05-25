import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import _ from 'lodash';
import { stateExt } from './ext';

@Component({
  selector: 'app-cm-editor-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CmEditorComponent)
    }
  ],
  templateUrl: './cm-editor.component.html',
  styleUrl: './cm-editor.component.scss'
})
export class CmEditorComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('editor', { static: true }) editor: any;


  /**
   *
   *
   * https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/11
   *
   *
   */

  @Input()
  lineNumbers: boolean = true;

  @Input()
  readonly: boolean = false;

  @Input() focus = false;

  private _code!: any;
  defaultString = '';

  onTouched = () => { };
  onChanged = (v: any) => { };

  @Output() editorSubmit: EventEmitter<any> = new EventEmitter<any>();

  state!: EditorState;
  view!: EditorView;

  constructor() {
  }


  ngAfterViewInit(): void {
    if (!this.editor) {
      return;
    }
    const element = this.editor.nativeElement;
    try {
      this.setState(this.defaultString);
    } catch (e) {
      console.error(e);
    }

    this.view = new EditorView({
      state: this.state,
      parent: element
    });
    if (this.focus) {
      this.view.focus();
    }
  }

  submit = () => {
    let text: any = _.get(this.view, 'state.doc.text', []);
    text = text.map((e: string, ix: number) => {
      if (!e) { return ''; }
      const trimLength = e.trim().length;
      if (!trimLength) { return ''; }
      return e;
    });
    this.writeValue({ text });
    this.editorSubmit.emit();
  }

  setState(str: string) {
    this.state = EditorState.create({
      doc: str,
      extensions: [
        ...stateExt,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const text = _.get(update.state.doc, 'text', []);
            this.onChanged({
              text: text,
              dom: this.view.contentDOM
            });
          }
        }),
        keymap.of([
          {
            key: 'Ctrl-Enter Cmd-Enter',
            run: (e: any) => {
              console.log('event', e);
              this.submit();
              return true;
            }
          }
        ])
      ]
    });
  }

  public writeValue(input: any): void {
    const str = _.get(input, 'text', []).join('\n');
    if (_.get(input, 'new') || str !== this._code) {
      _.unset(input, 'new');
      this._code = str;
      this.setState(this._code)
      if (!this.view) { return; }
      this.view.setState(this.state);
      this.view.focus();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
}
