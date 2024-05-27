export type EditorText = {
  text: string[];
  dom?: any;
  new?: boolean;
}


export type ITime = {
  timeZone: string;
  abbr?: string;
  time: string;
}


export type TApp = {
  name: string;
  path: string[];
}

export type TObject = {
  [key: string]: any;
}

export type TDiff = {
  changed: boolean;
  position: string;
  type: string;
  incompatible?: boolean;
  add?: boolean;
  remove?: boolean;
  change?: boolean;
}
