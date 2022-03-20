import { IPerson } from "../interfaces/interfaces";

export const personsList: IPerson[] = [
  {
    id: 1,
    name: "osoba",
    phone: 111111111,
    status: { zamestnanec: ["ÚVT", "ÚVT"], student: ["FI", "FF"] },
  },
  {
    id: 2,
    name: "osoba",
    phone: 222222222,
    status: { zamestnanec: ["MU", "PřF"], student: [] },
  },
  {
    id: 3,
    name: "osoba",
    phone: 333333333,
    status: { zamestnanec: [], student: ["ESF"] },
  },
  {
    id: 4,
    name: "osoba",
    phone: 444444444,
    status: { zamestnanec: ["MU", "PrF"], student: [] },
  },
  {
    id: 5,
    name: "osoba",
    phone: 555555555,
    status: { zamestnanec: ["MU", "FF"], student: ["FF"] },
  },
  {
    id: 6,
    name: "osoba",
    phone: 666666666,
    status: { zamestnanec: ["MU", "FSS"], student: ["FSS"] },
  },
  {
    id: 7,
    name: "osoba",
    phone: 777777777,
    status: { zamestnanec: ["MU", "FI"], student: [] },
  },
  {
    id: 8,
    name: "osoba",
    phone: 888888888,
    status: { zamestnanec: ["MU", "PdF"], student: [] },
  },
  {
    id: 9,
    name: "osoba",
    phone: 999999999,
    status: { zamestnanec: ["MU", "FSpS"], student: [] },
  },
  {
    id: 10,
    name: "osoba",
    phone: 111222333,
    status: { zamestnanec: ["CEITEC", "CEITEC"], student: [] },
  },
];
