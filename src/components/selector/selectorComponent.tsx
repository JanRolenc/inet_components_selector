import React, { useState, useEffect } from "react";
import Select from "react-select";
import { IPersons, ISelector, State } from "../../Interfaces/interfaces";
import "./selectorComponent.scss";
import personContainer from "../personContainer/personContainer";

function Selector({ required, disabled }: ISelector) {
  const [persons, setPersons] = useState<IPersons[]>([
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
      status: { zamestnanec: ["CEITEC", "CEITEC"], student: [] },
    },
  ]);
  // const [persons, setPersons] = useState<IPersons[]>([]);
  const [isCheckedZam, setIsCheckedZam] = useState(true);
  const [isCheckedStu, setIsCheckedStu] = useState(true);
  // const [options, setOptions] = useState<IPersons[]>([]);

  // const getPersons = () => {
  //   fetch("data.json", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (persons) {
  //       setPersons(persons);
  //     });
  // };
  // useEffect(() => {
  //   getPersons();
  // }, []);

  const onCheckboxStuChange = () => {
    isCheckedZam && !isCheckedStu
      ? setPersons(persons)
      : isCheckedZam && isCheckedStu
      ? setPersons(persons.filter((p) => p.status.zamestnanec.length > 0))
      : !isCheckedZam && isCheckedStu
      ? setPersons(persons.filter((p) => p.status.student.length > 10))
      : setPersons(persons.filter((p) => p.status.student.length > 0));
    setIsCheckedStu(!isCheckedStu);
  };
  const onCheckboxZamChange = () => {
    !isCheckedZam && isCheckedStu
      ? setPersons(persons)
      : isCheckedZam && isCheckedStu
      ? setPersons(persons.filter((p) => p.status.student.length > 0))
      : isCheckedZam && !isCheckedStu
      ? setPersons(persons.filter((p) => p.status.zamestnanec.length > 10))
      : setPersons(persons.filter((p) => p.status.zamestnanec.length > 0));
    setIsCheckedZam(!isCheckedZam);
  };
  const personsStyles = {
    control: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: required ? "#fcf4e3!important;" : undefined,
      // border: "1px solid #9CB5CC",
      borderRadius: "3px",
      padding: "0px 3px",
      minHeight: "auto",
      zIndex: "auto",
      // borderColor: isFocused ? "#E8B34A !important" : undefined,
      // boxShadow: isFocused ? "0 0 5px #F1BB52" : "0 0 2px #9cb5cc inset",
    }),
    singleValue: (styles: any) => ({
      ...styles,
      zIndex: "1",
    }),
    menuList: (styles: any) => ({
      ...styles,
      color: "#555",
      //      background: "#fcf4e3!important;",
    }),
    option: (styles: any, { isFocused }: any) => ({
      ...styles,
      fontWeight: "normal",
      display: "block",
      whiteSpace: "nowrap",
      minHeight: "1.2em",
      marginBottom: "5px",
      marginTop: "5px",
      padding: "0px 2px 1px",
      lineHeight: "1.15",
      backgroundColor: isFocused ? "#555" : undefined,
      color: isFocused ? "white" : undefined,
      zIndex: 1,
    }),
    menu: (styles: any) => ({
      ...styles,
      color: "#555",
      //      background: "#fcf4e3!important;",
      zIndex: 100,
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      padding: "3px",
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      // opacity: 0,
      color: "red",
      border: "1px solid red",
    }),
  };
  return (
    <div className="selector-container">
      <div className="checkboxes-container">
        <input
          type="checkbox"
          id="zam"
          name="zam"
          value="Zaměstnanec"
          checked={isCheckedZam}
          onClick={onCheckboxZamChange}
        ></input>
        <label htmlFor="zam">
          Zaměstnanec<span></span>
        </label>
        <input
          type="checkbox"
          id="stud"
          name="stud"
          value="Student"
          onClick={onCheckboxStuChange}
          checked={isCheckedStu}
        ></input>
        <label htmlFor="stud">Student</label>
      </div>

      <Select
        classNamePrefix="select"
        placeholder="Vyhledej..."
        options={persons}
        formatOptionLabel={personContainer}
        getOptionValue={(option) => "" + option.id}
        isDisabled={disabled}
        isClearable={true}
        menuIsOpen={true} //dropdown menu-list zustane rozevreny a da se lip zkoumat
        styles={personsStyles}
      />
    </div>
  );
}

export default Selector;