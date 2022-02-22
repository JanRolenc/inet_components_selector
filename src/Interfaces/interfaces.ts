export interface IPersons {
    readonly value: string;
    readonly id: number;
    readonly label: string;
    readonly name: string;
    readonly phone: number;
    readonly status?: Relationship;
  }
  
  interface Relationship {
    readonly zamestnanec: string[];
    readonly student: string[];
  }