export interface IPersons {
  readonly value: string;
  readonly id: number;
  readonly label: string;
  readonly name: string;
  readonly phone: number;
  readonly status: Relationship;
}

export interface ISelector {
  readonly required: boolean;
  readonly disabled: boolean;
}

export interface Relationship {
  readonly zamestnanec: string[];
  readonly student: string[];
}

export type FormatOptionLabelContext = "menu" | "value";
export interface FormatOptionLabelMeta {
  context: FormatOptionLabelContext;
}
export interface State {
  readonly isClearable: boolean;
  readonly isDisabled: boolean;
  readonly isLoading: boolean;
  readonly isRtl: boolean;
  readonly isSearchable: boolean;
}
