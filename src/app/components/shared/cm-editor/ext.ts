import { indentLess, indentMore } from "@codemirror/commands";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json"

/**
 *
 * https://pastebin.com/28Z610Es
 */


export const stateTheme = EditorView.theme({
  // '&': { 'max-height': '720px' },
  // $: {
  //   fontSize: "11pt",
  //   border: "1px solid #c0c0c0"
  // },
  '.cm-content': {
    'min-height': "600px"
  },
  '.cm-gutters': {
    'min-height': "200px"
  },
  '.cm-scroller': {
    overflow: "auto",
    'max-height': "718px"
  }
});

export const stateExt = [
  basicSetup,
  stateTheme,
  placeholder('Enter text here...'),
  keymap.of([
    { key: "Tab", run: indentMore, shift: indentLess }
  ]),
  json()
];

export const viewExt = [

];
