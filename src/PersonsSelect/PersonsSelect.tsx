import React, { useState, useEffect, ChangeEvent } from "react";
import Select, { ActionMeta, InputActionMeta, components } from "react-select";
import AsyncSelect from "react-select/async";
import { IPerson, IPersonsSelect, IUnit } from "./interfaces/interfaces";
import "./PersonsSelect.scss";
import PersonContainer from "./PersonContainer";
import UnitContainer from "./UnitContainer";
import UnitsFilter from "./UnitsFilter";

export default function PersonsFilter({
  required,
  disabled,
  name,
  selectedId,
}: IPersonsSelect) {
  const [persons, setPersons] = useState<IPerson[]>([
    {
      id: 1,
      name: "Jules Verne",
      phone: 111111111,
      status: { zamestnanec: ["ÚVT"], student: ["FI", "FF"] },
      unit: ["ÚVT", "FI", "FF"],
    },
    {
      id: 2,
      name: "Ota Pavel",
      phone: 222222222,
      status: { zamestnanec: ["PřF"], student: [] },
      unit: ["PřF"],
    },
    {
      id: 3,
      name: "Bohumil Hrabal",
      phone: 333333333,
      status: { zamestnanec: [], student: ["ESF"] },
      unit: ["ESF"],
    },
    {
      id: 4,
      name: "Jan Skácel",
      phone: 444444444,
      status: { zamestnanec: ["PrF"], student: [] },
      unit: ["PrF"],
    },
    {
      id: 5,
      name: "Karel Čapek",
      phone: 555555555,
      status: { zamestnanec: ["FF"], student: ["FF"] },
      unit: ["FF"],
    },
    {
      id: 6,
      name: "Arnošt Lustig",
      phone: 666666666,
      status: { zamestnanec: ["FSS"], student: ["FSS"] },
      unit: ["FSS"],
    },
    {
      id: 7,
      name: "Vladislav Vančura",
      phone: 777777777,
      status: { zamestnanec: ["FI"], student: [] },
      unit: ["FI"],
    },
    {
      id: 8,
      name: "Karolina Světlá",
      phone: 888888888,
      status: { zamestnanec: ["PdF"], student: [] },
      unit: ["PdF"],
    },
    {
      id: 9,
      name: "Alena Mornštajnová",
      phone: 999999999,
      status: { zamestnanec: ["FSpS"], student: [] },
      unit: ["FSpS"],
    },
    {
      id: 10,
      name: "Božena Němcová",
      phone: 111222333,
      status: { zamestnanec: ["CEITEC"], student: [] },
      unit: ["CEITEC"],
    },
    {
      id: 11,
      name: "Ani student, ani zamestnanec",
      phone: 0,
      status: { zamestnanec: [], student: [], zadnyVztah: "lobbista" },
      unit: [],
    },
  ]);
  const [optionsPersons, setOptionsPersons] = useState<IPerson[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [isCheckedZam, setIsCheckedZam] = useState(true);
  const [isCheckedStud, setIsCheckedStud] = useState(true);

  const [unitsSelected, setUnitsSelected] = useState<IUnit[]>([]);

  const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleChange = (person: IPerson | null) => {
  //   setSelectedValuePerson(person);
  // };

  // const getPersons = () => {
  //   fetch('data.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(function (persons) {
  //       setPersons(persons)
  //     })
  // }
  // useEffect(() => {
  //   getPersons()
  // }, [])

  const personsStyles = {
    control: (styles: any) => ({
      ...styles,
      minHeight: "auto", //zajisti uzsi cely input
      // zIndex: "auto",//???
      // width: "350px",//sirka je upravena v nadrazenem person-filter-container
    }),
    option: (styles: any, { isFocused }: any) => ({
      ...styles,
      backgroundColor: isFocused ? "#999" : undefined,
      color: isFocused ? "white" : undefined,
      zIndex: 1,
    }),
    //mohlo by se asi zrusit
    // menu: (styles: any) => ({
    //   ...styles,
    //   color: "#555",
    //   zIndex: 100,
    //   width: "350px",
    // }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: "3px", //zajisti uzsi cely input
    }),
    clearIndicator: (styles: any) => ({
      ...styles,
      padding: "3px", //zajisti uzsi cely input
    }),
  };

  const filterPersons = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    unitsSel: IUnit[]
  ): IPerson[] => {
    return persons.filter(
      (i) =>
        i.name.toLowerCase().includes(srchValPer.toLowerCase()) &&
        (unitsSel.length === 0 ||
          unitsSel.some((u) => i.unit.includes(u.shortCs))) &&
        ((!zam && !stud) ||
          (zam && i.status.zamestnanec.length > 0) ||
          (stud && i.status.student.length > 0))
    );
  };
  const searchPersonsAsync = (
    srchValPer: string,
    zam: boolean,
    stud: boolean,
    unitsSel: IUnit[]
  ) => {
    if (!srchValPer && srchValPer.length < 1) {
      //tady pozdeji nastavime <2
      setOptionsPersons([]);
    } else {
      setIsLoading(true);
      new Promise<IPerson[]>((resolve) => {
        setTimeout(
          () => resolve(filterPersons(srchValPer, zam, stud, unitsSel)),
          500
        );
      })
        .then((loadedPersons) => {
          setOptionsPersons(loadedPersons);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onCheckboxStudChange = () => {
    const newIsChecked = !isCheckedStud;
    setIsCheckedStud(newIsChecked);
    searchPersonsAsync(searchValue, isCheckedZam, newIsChecked, unitsSelected);
  };
  const onCheckboxZamChange = () => {
    const newIsChecked = !isCheckedZam;
    setIsCheckedZam(newIsChecked);
    searchPersonsAsync(
      searchValue,
      newIsChecked,
      isCheckedStud,
      unitsSelected //ze State
    );
  };

  const Menu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div className="checkboxes-container">
          <input
            type="checkbox"
            id="zam"
            name="zam"
            checked={isCheckedZam}
            onChange={onCheckboxZamChange}
          ></input>
          <label htmlFor="zam">
            Zaměstnanec<span></span>
          </label>
          <input
            type="checkbox"
            id="stud"
            name="stud"
            checked={isCheckedStud}
            onChange={onCheckboxStudChange}
          ></input>
          <label htmlFor="stud">Student</label>
        </div>
        <UnitsFilter
          unitsSelected={unitsSelected}
          setUnitsSelected={(unitsSel: IUnit[]) => {
            setUnitsSelected(unitsSel);
            searchPersonsAsync(
              searchValue,
              isCheckedZam,
              isCheckedStud,
              unitsSel
            );
          }}
          setParentMenuOpen={setMenuIsOpen}
        />
        <div>{props.children}</div>
      </components.Menu>
    );
  };
  console.log("menuIsOpen", menuIsOpen);

  return (
    <div
      className="persons-filter-container"
      onBlur={(e) => e.stopPropagation()}
    >
      <input
        type="hidden"
        name={name}
        value={selectedPerson ? selectedPerson.id : ""}
      />
      <Select
        defaultValue={persons.filter((p) => p.id === selectedId)[0]} //proc je tady [0]? - protoze filter vraci pro kazde (p) pole, i kdyz je v nem jen jeden objekt a my chceme jen objekt
        placeholder="Vyhledej osobu (alespoň 2 písmena) ..."
        components={{ Menu }}
        options={optionsPersons}
        getOptionValue={(option) => "" + option.id} //pomoci '' nemusime stringify
        formatOptionLabel={PersonContainer}
        isDisabled={disabled}
        isSearchable={true}
        isClearable={true}
        menuIsOpen={menuIsOpen}
        styles={personsStyles}
        //  onChange={handleChange}
        inputValue={searchValue}
        onInputChange={(newValue: string, action: InputActionMeta) => {
          if (
            action.action !== "input-blur" &&
            action.action !== "menu-close"
          ) {
            setSearchValue(newValue);
            searchPersonsAsync(
              newValue,
              isCheckedZam,
              isCheckedStud,
              unitsSelected
            );
          }
        }}
        onFocus={() =>
          //spusti filterPersons
          searchPersonsAsync(
            searchValue,
            isCheckedZam,
            isCheckedStud,
            unitsSelected
          )
        }
        filterOption={() => true} // filtrovano v async funkci
        isLoading={isLoading} //featura loading... zobrazi se v menu
      />
    </div>
  );
}
