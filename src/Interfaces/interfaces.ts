export interface IPerson {
  readonly id: number;
  readonly name: string;
  readonly phone: number;
  readonly status: Relationship;
  readonly fakulta: string[];
}
export interface IUnit {
  readonly id: string;
  readonly nameCs: string;
  readonly nameEn: string;
  readonly shortCs: string;
  readonly shortEn: string;
  readonly color: string;
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
  readonly zadnyVztah?: string;
}

export type FormatOptionLabelContext = "menu" | "value";
export interface FormatOptionLabelMeta {
  context: FormatOptionLabelContext;
  inputValue: string;
}
