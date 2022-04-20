export interface IPerson {
  readonly id: number;
  readonly name: string;
  readonly phone: number;
  readonly status: Relationship;
  readonly unit: string[];
  favourite: boolean;
  readonly myId?: number;
}
export interface IUnit {
  readonly id: string;
  readonly nameCs: string;
  readonly nameEn: string;
  readonly shortCs: string;
  readonly shortEn: string;
  readonly color: string;
}

export enum OptionsMode {
  ME,
  FAVOURITE,
  SEARCH,
}

export interface IPersonsSelect {
  readonly required: boolean;
  readonly disabled: boolean;
  readonly name: string;
  readonly selectedId?: number;
  readonly myId?: number;
}
export interface IUnitsFilter {
  readonly unitsSelected: IUnit[];
  readonly setUnitsSelected: (unitsSelected: IUnit[]) => void;
  readonly setParentMenuOpen: (menuOpen: boolean | undefined) => void;
}
export interface IUnitsFilterCustom {
  readonly unitsSelected: IUnit[];
  readonly setUnitsSelected: (unitsSelected: IUnit[]) => void;
  // readonly unitValue: string;
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
