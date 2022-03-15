export interface IPerson {
  readonly id: number;
  readonly name: string;
  readonly phone: number;
  readonly status: Relationship;
}

export interface ISelector {
  readonly required: boolean;
  readonly disabled: boolean;
  readonly name: string;
  readonly selectedId?: number;
}

export interface Relationship {
  readonly zamestnanec: string[];
  readonly student: string[];
}

export type FormatOptionLabelContext = "menu" | "value";
export interface FormatOptionLabelMeta {
  context: FormatOptionLabelContext;
  inputValue: string;
}