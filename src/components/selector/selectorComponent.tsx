import React, { useState, useEffect, ChangeEvent, Fragment } from "react";
import Select, { ActionMeta, components } from "react-select";
import { IPerson, ISelector, IUnit } from "../../interfaces/interfaces";
import "./SelectorComponent.scss";
import PersonContainer from "../PersonContainer/PersonContainer";

function Selector({ required, disabled, name, selectedId }: ISelector) {
  const [persons, setPersons] = useState<IPerson[]>([
    {
      id: 1,
      name: "Jules Verne",
      phone: 111111111,
      status: { zamestnanec: ["ÚVT", "ÚVT"], student: ["FI", "FF"] },
    },
    {
      id: 2,
      name: "Ota Pavel",
      phone: 222222222,
      status: { zamestnanec: ["MU", "PřF"], student: [] },
    },
    {
      id: 3,
      name: "Bohumil Hrabal",
      phone: 333333333,
      status: { zamestnanec: [], student: ["ESF"] },
    },
    {
      id: 4,
      name: "Jan Skácel",
      phone: 444444444,
      status: { zamestnanec: ["MU", "PrF"], student: [] },
    },
    {
      id: 5,
      name: "Karel Čapek",
      phone: 555555555,
      status: { zamestnanec: ["MU", "FF"], student: ["FF"] },
    },
    {
      id: 6,
      name: "Arnošt Lustig",
      phone: 666666666,
      status: { zamestnanec: ["MU", "FSS"], student: ["FSS"] },
    },
    {
      id: 7,
      name: "Vladislav Vančura",
      phone: 777777777,
      status: { zamestnanec: ["MU", "FI"], student: [] },
    },
    {
      id: 8,
      name: "Karolina Světlá",
      phone: 888888888,
      status: { zamestnanec: ["MU", "PdF"], student: [] },
    },
    {
      id: 9,
      name: "Alena Mornštajnová",
      phone: 999999999,
      status: { zamestnanec: ["MU", "FSpS"], student: [] },
    },
    {
      id: 10,
      name: "Božena Němcová",
      phone: 111222333,
      status: { zamestnanec: ["CEITEC", "CEITEC"], student: [] },
    },
    {
      id: 11,
      name: "Ani student, ani zamestnanec",
      phone: 0,
      status: { zamestnanec: [], student: [], zadnyVztah: "lobbista" },
    },
  ]);
  const [units, setUnits] = useState<IUnit[]>([
    {
      id: "110000",
      nameCs: "Lékařská fakulta",
      nameEn: "Faculty of Medicine",
      shortCs: "LF",
      shortEn: "MED",
      color: "#f01928",
    },
    {
      id: "160000",
      nameCs: "Farmaceutická fakulta",
      nameEn: "Faculty of Pharmacy",
      shortCs: "FaF",
      shortEn: "PHARM",
      color: "#002776",
    },
    {
      id: "210000",
      nameCs: "Filozofická fakulta",
      nameEn: "Faculty of Arts",
      shortCs: "FF",
      shortEn: "SCI",
      color: "#4bc8ff",
    },
    {
      id: "220000",
      nameCs: "Právnická fakulta",
      nameEn: " Faculty of Law",
      shortCs: "PrF",
      shortEn: "LAW",
      color: "#814a0a",
    },
    {
      id: "230000",
      nameCs: "Fakulta sociálních studií",
      nameEn: "Faculty of Social Studies",
      shortCs: "FSS",
      shortEn: "FSS",
      color: "#008c78 ",
    },
    {
      id: "310000",
      nameCs: "Přírodovědecká fakulta",
      nameEn: "Faculty of Science",
      shortCs: "PřF",
      shortEn: "SCI",
      color: "#00af3f",
    },
    {
      id: "330000",
      nameCs: "Fakulta informatiky",
      nameEn: "Faculty of Informatics",
      shortCs: "FI",
      shortEn: "FI",
      color: "#f2d45c",
    },
    {
      id: "410000",
      nameCs: "Pedagogická fakulta",
      nameEn: "Faculty of Education",
      shortCs: "PdF",
      shortEn: "PED",
      color: "#ff7300",
    },
    {
      id: "510000",
      nameCs: "Fakulta sportovních studií",
      nameEn: "Faculty of Sports Studies",
      shortCs: "FSpS",
      shortEn: "FSpS",
      color: "#002776",
    },
    {
      id: "560000",
      nameCs: "Ekonomicko-správní fakulta",
      nameEn: "Faculty of Economics and Administration",
      shortCs: "ESF",
      shortEn: "ECON",
      color: "#b9006e",
    },
  ]);
  const [isCheckedZam, setIsCheckedZam] = useState(true);
  const [isCheckedStu, setIsCheckedStu] = useState(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchUnits, setsearchUnits] = useState<string[]>([]);
  const [options, setOptions] = useState<IPerson[]>([]);
  const [selectedValue, setSelectedValue] = useState<IPerson | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleChange = (person: IPerson | null) => {
  //   setSelectedValue(person);
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
      minHeight: "auto",
      zIndex: "auto",
      width: "350px",
    }),
    option: (styles: any, { isFocused }: any) => ({
      ...styles,
      backgroundColor: isFocused ? "#999" : undefined,
      color: isFocused ? "white" : undefined,
      zIndex: 1,
    }),
    menu: (styles: any) => ({
      ...styles,
      color: "#555",
      zIndex: 100,
      width: "350px",
    }),
    //uzsi input
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: "3px",
    }),
    clearIndicator: (styles: any) => ({
      ...styles,
      padding: "3px",
    }),
  };

  const filterPersons = (
    srchVal: string,
    zam: boolean,
    stud: boolean
  ): IPerson[] => {
    return persons.filter(
      (i) =>
        i.name.toLowerCase().includes(srchVal.toLowerCase()) &&
        ((!zam && !stud) || //toto mi neni jasne...
          (zam && i.status.zamestnanec.length > 0) ||
          (stud && i.status.student.length > 0))
    );
  };
  const searchPersonsAsync = (
    srchVal: string,
    zam: boolean,
    stud: boolean,
    units: string[]
  ) => {
    if (!srchVal && srchVal.length < 1) {
      // zmenit na < 2
      setOptions([]);
    } else {
      setIsLoading(true);
      new Promise<IPerson[]>((resolve) => {
        setTimeout(() => resolve(filterPersons(srchVal, zam, stud)), 500);
      })
        .then((loadedPersons) => {
          // console.log("LOD ", loadedPersons);
          setOptions(loadedPersons);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onCheckboxStuChange = () => {
    const newIsChecked = !isCheckedStu;
    setIsCheckedStu(newIsChecked);
    searchPersonsAsync(searchValue, isCheckedZam, newIsChecked, searchUnits);
  };
  const onCheckboxZamChange = () => {
    const newIsChecked = !isCheckedZam;
    setIsCheckedZam(newIsChecked);
    searchPersonsAsync(searchValue, newIsChecked, isCheckedStu, searchUnits);
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
            checked={isCheckedStu}
            onChange={onCheckboxStuChange}
          ></input>
          <label htmlFor="stud">Student</label>
        </div>

        <div>{props.children}</div>
      </components.Menu>
    );
  };

  // console.log("OPTS ", options);
  return (
    <div className="selector-container">
      <input
        type="hidden"
        name={name}
        value={selectedValue ? selectedValue.id : ""}
      />
      <Select
        defaultValue={persons.filter((p) => p.id === selectedId)[0]} //proc je tady [0]? - protoze filter vraci pro kazde (p) pole, i kdyz je v nem jen jeden objekt a my chceme jen objekt
        placeholder="Vyhledej osobu (alespoň 2 písmena) ..."
        components={{ Menu }}
        options={options}
        getOptionValue={(option) => "" + option.id} //pomoci '' nemusime stringify
        formatOptionLabel={PersonContainer}
        isDisabled={disabled}
        isSearchable={true}
        isClearable={true}
        // menuIsOpen={true}
        styles={personsStyles}
        //  onChange={handleChange}
        onInputChange={(newValue: string) => {
          setSearchValue(newValue);
          searchPersonsAsync(newValue, isCheckedZam, isCheckedStu, searchUnits);
        }}
        onFocus={() =>
          searchPersonsAsync(
            searchValue,
            isCheckedZam,
            isCheckedStu,
            searchUnits
          )
        } //spusti filterPersons
        filterOption={() => true} // filtrovano v async funkci
        isLoading={isLoading}
      />
    </div>
  );
}

export default Selector;
