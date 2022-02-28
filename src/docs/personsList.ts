import { IPersons } from "../Interfaces/interfaces";

  export const personsList: IPersons[] = [
    {
      value: "jules verne",
      id: 1,
      label: "Jules Verne",
      name: "osoba",
      phone: 111111111,
      status: { zamestnanec: ["ÚVT", "ÚVT"], student: ["FI", "FF"] },
    },
    {
      value: "ota pavel",
      id: 2,
      label: "Ota Pavel",
      name: "osoba",
      phone: 222222222,
      status: { zamestnanec: ["MU", "PřF"], student: [] },
    },
    {
      value: "bohumi hrabal",
      id: 3,
      label: "Bohumil Hrabal",
      name: "osoba",
      phone: 333333333,
      status: { zamestnanec: [], student: ["ESF"] },
    },
    {
      value: "jan skácel",
      id: 4,
      label: "Jan Skácel",
      name: "osoba",
      phone: 444444444,
      status: { zamestnanec: ["MU", "PrF"], student: [] },
    },
    {
      value: "Karel čapek",
      id: 5,
      label: "Karel Čapek",
      name: "osoba",
      phone: 555555555,
      status: { zamestnanec: ["MU", "FF"], student: ["FF"] },
    },
    {
      value: "arnošt lustig",
      id: 6,
      label: "Arnošt Lustig",
      name: "osoba",
      phone: 666666666,
      status: { zamestnanec: ["MU", "FSS"], student: ["FSS"] },
    },
    {
      value: "vladislav vančura",
      id: 7,
      label: "Vladislav Vančura",
      name: "osoba",
      phone: 777777777,
      status: { zamestnanec: ["MU", "FI"], student: [] },
    },
    {
      value: "karolina světlá",
      id: 8,
      label: "Karolina Světlá",
      name: "osoba",
      phone: 888888888,
      status: { zamestnanec: ["MU", "PdF"], student: [] },
    },
    {
      value: "alena mornštajnová",
      id: 9,
      label: "Alena Mornštajnová",
      name: "osoba",
      phone: 999999999,
      status: { zamestnanec: ["MU", "FSpS"], student: [] },
    },
    {
      value: "božena němcová",
      id: 10,
      label: "Božena Němcová",
      name: "osoba",
      phone: 111222333,
      status: { zamestnanec: ["CEITEC", "CEITEC"], student: [] }
    }
  ];
  